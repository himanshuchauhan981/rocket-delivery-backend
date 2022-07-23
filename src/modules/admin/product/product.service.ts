import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';

import {
  CATEGORY_REPOSITORY,
  MEASURING_UNIT_REPOSITORY,
  PRODUCT_DESCRIPTION_REPOSITORY,
  PRODUCT_PRICE_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from '../../../core/constants/repositories';
import { Category } from '../../../modules/category/category.entity';
import { ProductPrice } from '../../../modules/product/product-price.entity';
import { Product } from '../../../modules/product/product.entity';
import { SubCategory } from '../../../modules/sub-category/sub-category.entity';
import { AdminProductList, NewProduct } from './dto/admin-product.dto';
import { File } from '../../../modules/admin/file/file.entity';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { MeasuringUnit } from '../../../modules/measuring-unit/measuring-unit.entity';
import { MESSAGES } from '../../../core/constants/messages';
import { ProductService as CommonProductService } from '../../product/product.service';
import { ApiResponse } from '../interface/admin';
import { ProductDescription } from '../../../modules/product/product-description.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
    @Inject(PRODUCT_PRICE_REPOSITORY)
    private readonly productPriceRepository: typeof ProductPrice,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    @Inject(SUB_CATEGORY_REPOSITORY)
    private readonly subCategoryRepository: typeof SubCategory,
    @Inject(MEASURING_UNIT_REPOSITORY)
    private readonly measuringUnitRepository: typeof MeasuringUnit,
    @Inject(PRODUCT_DESCRIPTION_REPOSITORY)
    private readonly productDescriptionRepository: typeof ProductDescription,
    private readonly commonProductService: CommonProductService,
  ) {}

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

  #validateDiscountDate(startDate: Date, endDate: Date): boolean {
    const currentDate = moment();
    const discountStartDate = moment(startDate);
    const discountEndDate = moment(endDate);

    if (
      currentDate.isSameOrBefore(discountStartDate) &&
      discountStartDate.isBefore(discountEndDate)
    ) {
      return true;
    }
    return false;
  }

  async findAll(payload: AdminProductList) {
    try {
      const sortBy = this.#sortProduct(payload.sort) || [];
      const page = payload.page * payload.limit;

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
        limit: payload.limit,
        offset: page,
      });

      for (const item of tempProductData.rows) {
        const productPrice = item.product_price;

        let discountDetails;

        if (productPrice.discount) {
          discountDetails = this.commonProductService.calculateDiscountPrice(
            productPrice.discount_start_date,
            productPrice.discount_end_date,
            productPrice.discount,
            productPrice.actual_price,
            productPrice.discount_type,
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

  async update(payload: NewProduct, productId: number): Promise<ApiResponse> {
    try {
      const productDetails = await this.productRepository.findByPk(productId);

      if (productDetails) {
        await this.productRepository.update(
          {
            name: payload.name,
            image_id: payload.image,
            category_id: payload.category,
            sub_category_id: payload.subCategory,
            max_quantity: payload.productStock,
            measuring_unit_id: payload.measuringUnit,
            minimum_cart_quantity: payload.minimumCartQuantity,
            maximum_cart_quantity: payload.maximumCartQuantity,
            stock_visibility: payload.stockVisibility,
          },
          { where: { id: productId } },
        );

        await this.productPriceRepository.update(
          {
            product_id: productId,
            actual_price: payload.unitPrice,
            discount: payload.discountPrice ? payload.discountPrice : null,
            discount_start_date: payload.discountStartDate
              ? payload.discountStartDate
              : null,
            discount_end_date: payload.discountEndDate
              ? payload.discountEndDate
              : null,
            discount_type: payload.discountType ? payload.discountType : null,
            refundable: payload.refundable,
          },
          { where: { product_id: productId } },
        );

        await this.productDescriptionRepository.update(
          {
            description: payload.description,
            benefits: payload.benefitsList.length ? payload.benefitsList : [],
            features: payload.featuresList.length ? payload.featuresList : [],
            ingredients: payload.ingredients,
          },
          { where: { id: productDetails.description_id } },
        );

        return {
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.PRODUCT_UPDATE_SUCCESSFULL,
        };
      } else {
        throw new HttpException(
          MESSAGES.PRODUCT_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number): Promise<ApiResponse> {
    try {
      const productDetails = await this.productRepository.findByPk(id);

      if (productDetails) {
        await this.productRepository.update(
          { is_deleted: 1 },
          { where: { id } },
        );
        return {
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.PRODUCT_DELETE_SUCCESSFULL,
        };
      }
      throw new HttpException(MESSAGES.INVALID_ID, STATUS_CODE.NOT_FOUND);
    } catch (err) {
      throw err;
    }
  }

  async createNew(payload: NewProduct): Promise<ApiResponse> {
    try {
      const categoryDetails = await this.categoryRepository.findByPk(
        payload.category,
      );
      const measuringUnitDetails = await this.measuringUnitRepository.findByPk(
        payload.measuringUnit,
      );

      if (!categoryDetails) {
        throw new HttpException(
          MESSAGES.CATEGORY_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      if (payload.subCategory) {
        const subCategoryDetails = await this.subCategoryRepository.findByPk(
          payload.subCategory,
        );

        if (!subCategoryDetails) {
          throw new HttpException(
            MESSAGES.SUB_CATEGORY_NOT_FOUND,
            STATUS_CODE.NOT_FOUND,
          );
        }
      }

      if (!measuringUnitDetails) {
        throw new HttpException(
          MESSAGES.MEASURING_UNIT_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      if (payload.discountStartDate && payload.discountEndDate) {
        const status = this.#validateDiscountDate(
          payload.discountStartDate,
          payload.discountEndDate,
        );

        if (!status) {
          throw new HttpException(
            MESSAGES.INVALID_DISCOUNT_DATE,
            STATUS_CODE.NOT_ACCEPTABLE,
          );
        }
      }

      const newDescriptionObj = {
        description: payload.description,
        benefitsList: payload.benefitsList,
        featuresList: payload.featuresList,
        ingredients: payload.ingredients,
      };

      const newDescription =
        await this.productDescriptionRepository.create<any>(newDescriptionObj);

      const newProductObj = {
        category_id: payload.category,
        sub_category_id: payload.subCategory,
        max_quantity: payload.productStock,
        measuring_unit_id: payload.measuringUnit,
        name: payload.name,
        image_id: payload.image,
        description_id: newDescription.id,
        stock_visibility: payload.stockVisibility,
        minimum_cart_quantity: payload.minimumCartQuantity,
        maximum_cart_quantity: payload.maximumCartQuantity,
      };

      const newProduct = await this.productRepository.create<any>(
        newProductObj,
      );

      const productPriceObj = {
        product_id: newProduct.id,
        actual_price: payload.unitPrice,
        discount: payload.discountPrice,
        discount_type: payload.discountType
          ? payload.discountType.toLocaleUpperCase()
          : null,
        discount_start_date: payload.discountStartDate,
        discount_end_date: payload.discountEndDate,
        refundable: payload.refundable,
      };

      await this.productPriceRepository.create<any>(productPriceObj);

      await this.productRepository.update(
        { is_active: 1 },
        { where: { id: newProduct.id } },
      );

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.PRODUCT_ADD_SUCCESSFULL,
      };
    } catch (err) {
      throw err;
    }
  }
}
