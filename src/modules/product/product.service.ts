import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';

import { CATEGORY_REPOSITORY, MEASURING_UNIT_REPOSITORY, PRODUCT_PRICE_REPOSITORY, PRODUCT_REPOSITORY, SUB_CATEGORY_REPOSITORY } from 'src/core/constants/repositories';
import { AdminProductList, NewProduct } from '../admin/admin-product/dto/admin-product.dto';
import { File } from '../admin/file/file.entity';
import { Category } from '../category/category.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { ProductPrice } from './product-price.entity';
import { Product } from './product.entity';
import { MESSAGES } from 'src/core/constants/messages';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { MeasuringUnit } from '../measuring-unit/measuring-unit.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product,
    @Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: typeof Category,
    @Inject(SUB_CATEGORY_REPOSITORY) private readonly subCategoryRepository: typeof SubCategory,
    @Inject(PRODUCT_PRICE_REPOSITORY) private readonly productPriceRepository: typeof ProductPrice,
    @Inject(MEASURING_UNIT_REPOSITORY) private readonly measuringUnitRepository: typeof MeasuringUnit
  ) {}

  #calculateDiscountPrice(
		start_date: Date,
		end_date: Date,
		discount: number,
		actual_price: number,
		discount_type: string
	) {
		let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
		let discountStartDate = moment(start_date).format('YYYY-MM-DD HH:mm:ss');
		let discountEndDate = moment(end_date).format('YYYY-MM-DD HH:mm:ss');
		let discountStatus;
		let discountPrice;

		if (discountStartDate <= currentDate && discountEndDate >= currentDate) {
			discountStatus = true;
			if (discount_type == 'FLAT') {
				discountPrice = actual_price - discount;
			} else {
				discountPrice = (discount / 100) * actual_price;
				discountPrice = actual_price - discountPrice;
			}

			return {
				discountPrice,
				discountStatus,
			};
		} else {
			discountStatus = false;
			discountPrice = 0;
			return { discountStatus, discountPrice };
		}
	}

  #validateDiscountDate(startDate: Date, endDate: Date): boolean{
    const currentDate = moment();
    const discountStartDate = moment(startDate);
    const discountEndDate = moment(endDate);

    
    if(currentDate.isSameOrBefore(discountStartDate) && discountStartDate.isBefore(discountEndDate)) {
      return true;
    }
    return false;
  }

  async countProducts(category_id: number): Promise<number> {
    try {
      const products = await this.productRepository.findAndCountAll({
        where: { category_id },
      });

      return products.count;
    } catch (err) {
      return err;
    }
  }

  async deleteByCategoryId(category_id: number): Promise<void> {
    await this.productRepository.update(
      { is_deleted: 1, is_active: 0 },
      { where: { category_id } },
    );
  }

  #sortProduct(sort: number) {
    let sortBy = [];

    if (sort == 0) {
      sortBy = [['name', 'ASC']];
    } else if (sort == 1) {
      sortBy = [[sequelize.literal('total_ratings'), 'DESC']];
    } else if (sort == 2) {
      sortBy = [[sequelize.literal('total_ratings'), 'ASC']];
    } else if (sort == 3) {
      sortBy = [[sequelize.literal('total_orders'), 'ASC']];
    } else if (sort == 4) {
      sortBy = [[sequelize.literal('total_orders'), 'DESC']];
    }

    return sortBy;
  }

  async findAll(payload: AdminProductList) {
    try {
      const sortBy = this.#sortProduct(payload.sort) || [];
      const pageIndex = payload.pageIndex * payload.pageSize;


      const tempProductData = await this.productRepository.findAndCountAll({
        where: payload.search
          ? {
              [sequelize.Op.and]: [
                { is_deleted: 0 },
                {
                  name: {
                    [sequelize.Op.iLike]: `%${payload.search}%`,
                  },
                },
              ],
            }
          : { is_deleted: 0 },
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: SubCategory, attributes: ['id', 'name'] },
          {
            model: ProductPrice,
            attributes: [
              'id',
              'actual_price',
              'discount',
              'discount_type',
              'discount_start_date',
              'discount_end_date',
            ],
          },
          { model: File, attributes: ['id', 'url'] },
        ],
        attributes: [
          'id',
          'name',
          'max_quantity',
          [
            sequelize.literal(
              '(SELECT CAST(COALESCE(sum(quantity),0) AS INTEGER) from order_products op where op.product_id = "Product".id)',
            ),
            'total_orders',
          ],
          [
            sequelize.literal(
              '(SELECT CAST(COALESCE(sum(ratings),0) AS INTEGER) from product_review where product_id = "Product".id)',
            ),
            'total_ratings',
          ],
        ],
        order: sortBy,
        limit: payload.pageSize,
        offset: pageIndex,
      });

      for(const item of tempProductData.rows) {
        const productPrice =item.product_price;

        let discountDetails;

        if (productPrice.discount) {
          discountDetails = this.#calculateDiscountPrice(
            productPrice.discount_start_date,
            productPrice.discount_end_date,
            productPrice.discount,
            productPrice.actual_price,
            productPrice.discount_type
          );

          item.product_price.discount = discountDetails.discountPrice;
          item.product_price.discount_status = discountDetails.discountStatus;
        }
      }

      return {
        data: {
          productsList: tempProductData.rows,
          count: tempProductData.count,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  async createNew(payload: NewProduct) {
    try {
      const categoryDetails = await this.categoryRepository.findByPk(payload.category);
      const measuringUnitDetails = await this.measuringUnitRepository.findByPk(payload.measuringUnit);

      
      if(!categoryDetails) {
        throw new HttpException(MESSAGES.CATEGORY_NOT_FOUND, STATUS_CODE.NOT_FOUND);
      }

      if(payload.subCategory) {
        const subCategoryDetails = await this.subCategoryRepository.findByPk(payload.subCategory);

        if(!subCategoryDetails) {
          throw new HttpException(MESSAGES.SUB_CATEGORY_NOT_FOUND, STATUS_CODE.NOT_FOUND);
        }
      }

      if(!measuringUnitDetails) {
        throw new HttpException(MESSAGES.MEASURING_UNIT_NOT_FOUND, STATUS_CODE.NOT_FOUND);
      }

      if(payload.discountStartDate && payload.discountEndDate) {
        const status = this.#validateDiscountDate(payload.discountStartDate, payload.discountEndDate);

        if(!status) {
          throw new HttpException(MESSAGES.INVALID_DISCOUNT_DATE, STATUS_CODE.NOT_ACCEPTABLE);
        }
      }

      const newProductObj = {
        category_id: payload.category,
        sub_category_id: payload.subCategory,
        max_quantity: payload.productStock,
        purchase_limit: payload.purchaseLimit,
        measuring_unit_id: payload.measuringUnit,
        name: payload.name,
        description: payload.description,
        image_id: payload.image
      };

      const newProduct = await this.productRepository.create<any>(newProductObj);

      const productPriceObj = {
        product_id: newProduct.id,
        actual_price: payload.unitPrice,
        discount: payload.discountPrice,
        discount_type: payload.discountType ? payload.discountType.toLocaleUpperCase() : null,
        discount_start_date: payload.discountStartDate,
        discount_end_date: payload.discountEndDate,
        refundable: payload.refundable
      }

      await this.productPriceRepository.create<any>(productPriceObj);

      await this.productRepository.update({ is_active: 1 },{ where: { id: newProduct.id } })

      return { statusCode: STATUS_CODE.SUCCESS,message: MESSAGES.PRODUCT_ADD_SUCCESSFULL };
    }
    catch(err) {
      throw err;
    }
  }

  async findOneById(productId: number) {
    try{
      const productDetails = await this.productRepository.findByPk(
        productId,
        { 
          include: [
            {
              model: ProductPrice,
              attributes: [
                'actual_price',
                'discount_start_date',
                'discount_end_date',
                'discount_type',
                'discount',
                'refundable',
              ],
            },
            { model: File, attributes: ['id', 'url', 'name'] },
						{ model: Category, attributes: ['id', 'name'] },
						{ model: SubCategory, attributes: ['id', 'name'] },
						{ model: MeasuringUnit, attributes: ['id', 'measuring_type', 'symbol'] },
          ],
          attributes: ['name', 'max_quantity', 'purchase_limit', 'description'],
        }
      );

      const productPrice = productDetails.product_price;

      const discountDetails = this.#calculateDiscountPrice(
        productPrice.discount_start_date,
        productPrice.discount_end_date,
        productPrice.discount,
        productPrice.actual_price,
        productPrice.discount_type
      );

      productDetails.product_price.discount_status = discountDetails.discountStatus;
			productDetails.product_price.discount = discountDetails.discountPrice;

      return { statusCode: STATUS_CODE.SUCCESS, data: { product_details: productDetails }, message: MESSAGES.SUCCESS };
    }
    catch(err) {
      throw err;
    }
  }
}
