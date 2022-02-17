import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';

import {
  CATEGORY_REPOSITORY,
  MEASURING_UNIT_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_HISTORY_REPOSITORY,
  PRODUCT_PRICE_REPOSITORY,
  PRODUCT_REPOSITORY,
  SUB_CATEGORY_REPOSITORY,
} from 'src/core/constants/repositories';
import {
  AdminProductList,
  NewProduct,
} from '../admin/admin-product/dto/admin-product.dto';
import { File } from '../admin/file/file.entity';
import { Category } from '../category/category.entity';
import { SubCategory } from '../sub-category/sub-category.entity';
import { ProductPrice } from './product-price.entity';
import { Product } from './product.entity';
import { MESSAGES } from 'src/core/constants/messages';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { MeasuringUnit } from '../measuring-unit/measuring-unit.entity';
import { UserCart, UserProducts } from '../user/dto/user.dto';
import { Order } from '../order/order.entity';
import { OrderProduct } from '../order/order-product.entity';
import { ProductReview } from '../product-review/product-review.entity';
import { ProductHistory } from '../product-history/product-history.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    @Inject(SUB_CATEGORY_REPOSITORY)
    private readonly subCategoryRepository: typeof SubCategory,
    @Inject(PRODUCT_PRICE_REPOSITORY)
    private readonly productPriceRepository: typeof ProductPrice,
    @Inject(MEASURING_UNIT_REPOSITORY)
    private readonly measuringUnitRepository: typeof MeasuringUnit,
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(PRODUCT_HISTORY_REPOSITORY)
    private readonly productHistoryRepository: typeof ProductHistory,
  ) {}

  #calculateDiscountPrice(
    start_date: Date,
    end_date: Date,
    discount: number,
    actual_price: number,
    discount_type: string,
  ) {
    const currentDate = moment();
    const discountStartDate = moment(start_date);
    const discountEndDate = moment(end_date);
    let discountStatus;
    let discountPrice;

    if (
      discountStartDate.isBefore(currentDate) &&
      discountEndDate.isAfter(discountStartDate)
    ) {
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

      for (const item of tempProductData.rows) {
        const productPrice = item.product_price;

        let discountDetails;

        if (productPrice.discount) {
          discountDetails = this.#calculateDiscountPrice(
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

  async createNew(payload: NewProduct) {
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

      const newProductObj = {
        category_id: payload.category,
        sub_category_id: payload.subCategory,
        max_quantity: payload.productStock,
        purchase_limit: payload.purchaseLimit,
        measuring_unit_id: payload.measuringUnit,
        name: payload.name,
        description: payload.description,
        image_id: payload.image,
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

  async findOneById(productId: number) {
    try {
      const productDetails = await this.productRepository.findByPk(productId, {
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
          {
            model: MeasuringUnit,
            attributes: ['id', 'measuring_type', 'symbol'],
          },
          {
            model: ProductReview,
            attributes: ['id', 'ratings'],
            where: { is_deleted: 0 },
          },
        ],
        attributes: ['name', 'max_quantity', 'purchase_limit', 'description'],
      });

      const productPrice = productDetails.product_price;
      let ratingCount = 0;

      const discountDetails = this.#calculateDiscountPrice(
        productPrice.discount_start_date,
        productPrice.discount_end_date,
        productPrice.discount,
        productPrice.actual_price,
        productPrice.discount_type,
      );

      productDetails.product_price.discount_status =
        discountDetails.discountStatus;
      productDetails.product_price.discount = discountDetails.discountPrice;

      for (let i = 0; i < productDetails.product_review.length; i++) {
        ratingCount = ratingCount + productDetails.product_review[i].ratings;
      }

      const avergeRating = ratingCount / productDetails.product_review.length;
      productDetails.average_ratings = parseFloat(avergeRating.toFixed(2));

      return {
        statusCode: STATUS_CODE.SUCCESS,
        data: { product_details: productDetails },
        message: MESSAGES.SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async update(payload: NewProduct, productId: number) {
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
            purchase_limit: payload.purchaseLimit,
            measuring_unit_id: payload.measuringUnit,
            description: payload.description,
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

  async delete(id: number) {
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

  async list(payload: UserProducts) {
    try {
      payload.page = payload.page * payload.limit;
      if (payload.sub_category_id) {
        const subCategoryDetails = await this.subCategoryRepository.findByPk(
          payload.sub_category_id,
        );

        if (!subCategoryDetails) {
          throw new HttpException(
            MESSAGES.SUB_CATEGORY_NOT_FOUND,
            STATUS_CODE.NOT_FOUND,
          );
        }
      } else if (payload.category_id) {
        const categoryDetails = await this.categoryRepository.findByPk(
          payload.category_id,
        );

        if (!categoryDetails) {
          throw new HttpException(
            MESSAGES.CATEGORY_NOT_FOUND,
            STATUS_CODE.NOT_FOUND,
          );
        }
      }

      const products = await this.productRepository.findAndCountAll({
        where: payload.sub_category_id
          ? { is_active: 1, is_deleted: 0 }
          : { category_id: payload.category_id, is_active: 1, is_deleted: 0 },
        include: [
          {
            model: ProductPrice,
            attributes: [
              'actual_price',
              'discount',
              'discount_start_date',
              'discount_end_date',
              'discount_type',
            ],
          },
          { model: MeasuringUnit, attributes: ['symbol'] },
          { model: File, attributes: ['id', 'url'] },
          payload.sub_category_id
            ? {
                model: SubCategory,
                where: { id: payload.sub_category_id },
                attributes: [],
              }
            : { model: Category, attributes: [] },
        ],
        order: [['name', 'ASC']],
        offset: payload.page,
        limit: payload.limit,
        attributes: [
          'id',
          'name',
          'max_quantity',
          'purchase_limit',
          payload.sub_category_id
            ? [sequelize.col('subCategory.name'), 'subCategoryName']
            : [sequelize.col('category.name'), 'subCategoryName'],
        ],
      });

      for (const item of products.rows) {
        const productPrice = item.product_price;

        const discountDetails = this.#calculateDiscountPrice(
          productPrice.discount_start_date,
          productPrice.discount_end_date,
          productPrice.discount,
          productPrice.actual_price,
          productPrice.discount_type,
        );

        item.product_price.discount_status = discountDetails.discountStatus;
        item.product_price.discount_price = discountDetails.discountPrice;
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { products: products.rows, count: products.count },
      };
    } catch (err) {
      throw err;
    }
  }

  async cartItems(payload: UserCart) {
    const productIds = payload.cartItems.map((items) => items.id);

    const productDetails = await this.productRepository.findAll({
      where: { id: { [sequelize.Op.in]: productIds } },
      include: [
        {
          model: ProductPrice,
          attributes: [
            'actual_price',
            'discount',
            'discount_type',
            'discount_start_date',
            'discount_end_date',
          ],
        },
        { model: File, attributes: ['id', 'url'] },
      ],
      attributes: ['id', 'name', 'is_active', 'max_quantity', 'purchase_limit'],
    });

    for (const item of productDetails) {
      const product_price = item.product_price;

      const discountDetails = this.#calculateDiscountPrice(
        product_price.discount_start_date,
        product_price.discount_end_date,
        product_price.discount,
        product_price.actual_price,
        product_price.discount_type,
      );

      if (discountDetails.discountStatus) {
        item.product_price.discount_price = discountDetails.discountPrice;
        item.product_price.discount_status = discountDetails.discountStatus;
      }

      const productQuantity = payload.cartItems.filter(
        (cartItem) => cartItem.id === item.id,
      )[0].quantity;

      if (
        productQuantity < item.max_quantity &&
        payload.removeCartItem === true
      ) {
        item.quantity = productQuantity;
      } else if (payload.removeCartItem === false) {
        item.quantity = productQuantity;
      }
    }

    return {
      statusCode: STATUS_CODE.SUCCESS,
      data: { cartProductDetails: productDetails },
      message: MESSAGES.SUCCESS,
    };
  }

  async #mostBookedProducts() {
    try {
      const bookedProducts = await this.orderRepository.findAll({
        include: [{ model: OrderProduct, attributes: [] }],
        attributes: [
          'order_products.product_id',
          [
            sequelize.fn('COUNT', sequelize.col('order_products.product_id')),
            'count',
          ],
        ],
        group: ['order_products.product_id'],
        order: [['count', 'DESC']],
        raw: true,
        subQuery: false,
        limit: 4,
      });

      for (const item of bookedProducts) {
        const productDetails = await this.productRepository.findOne({
          where: { id: item.product_id },
          include: [
            {
              model: ProductPrice,
              attributes: [
                'actual_price',
                'discount',
                'discount_type',
                'discount_start_date',
                'discount_end_date',
              ],
            },
            { model: File, attributes: ['url'] },
            { model: ProductReview, attributes: ['id', 'ratings'] },
          ],
          attributes: ['name', 'id'],
        });

        const product_price = productDetails.product_price;

        const discountDetails = this.#calculateDiscountPrice(
          product_price.discount_start_date,
          product_price.discount_end_date,
          product_price.discount,
          product_price.actual_price,
          product_price.discount_type,
        );

        productDetails.product_price.discount = discountDetails.discountPrice;
        productDetails.product_price.discount_status =
          discountDetails.discountStatus;

        let ratingCount = 0;
        for (let i = 0; i < productDetails.product_review.length; i++) {
          ratingCount = ratingCount + productDetails.product_review[i].ratings;
        }

        const averageRatings =
          productDetails.product_review.length === 0
            ? 0
            : ratingCount / productDetails.product_review.length;
        item.product = productDetails;
        item.product.average_ratings = averageRatings;
      }

      return bookedProducts;
    } catch (err) {
      throw err;
    }
  }

  async #mostViewedProducts(user_id: number, most_viewed_history: boolean) {
    try {
      const viewedProductDetails = await this.productHistoryRepository.findAll({
        where: { [sequelize.Op.and]: [{ user_id }, { is_deleted: 0 }] },
        include: [
          {
            model: Product,
            attributes: ['id', 'name'],
            include: [
              {
                model: ProductPrice,
                attributes: [
                  'actual_price',
                  'discount_type',
                  'discount',
                  'discount_start_date',
                  'discount_end_date',
                ],
              },
              { model: File, attributes: ['id', 'url'] },
            ],
          },
        ],
        attributes: ['id', 'view_count'],
        order: most_viewed_history ? [['view_count', 'DESC']] : [],
        limit: most_viewed_history ? 4 : null,
      });

      for (const item of viewedProductDetails) {
        const product_price = item.product.product_price;
        const discountDetails = this.#calculateDiscountPrice(
          product_price.discount_start_date,
          product_price.discount_end_date,
          product_price.discount,
          product_price.actual_price,
          product_price.discount_type,
        );
        item.product.product_price.discount_price =
          discountDetails.discountPrice;
        item.product.product_price.discount_status =
          discountDetails.discountStatus;
      }

      return viewedProductDetails;
    } catch (err) {
      throw err;
    }
  }

  async productOffers(userId: number) {
    try {
      const orderDetails = await this.#mostBookedProducts();
      const viewedProducts = await this.#mostViewedProducts(userId, false);

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: STATUS_CODE.SUCCESS,
        data: { orderDetails, viewedProducts },
      };
    } catch (err) {
      throw err;
    }
  }

  async discountOffers() {
    try {
      const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
      const productDetails = await this.productRepository.findAll({
        where: {},
        include: [
          { model: File, attributes: ['id', 'url'] },
          {
            model: ProductPrice,
            where: {
              [sequelize.Op.and]: [
                { discount_start_date: { [sequelize.Op.lt]: currentDate } },
                { discount_end_date: { [sequelize.Op.gt]: currentDate } },
              ],
            },
            attributes: [
              'actual_price',
              'discount',
              'discount_start_date',
              'discount_end_date',
              'discount_type',
            ],
          },
        ],
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
        limit: 5,
      });

      for (const item of productDetails) {
        const discountDetails = this.#calculateDiscountPrice(
          item.product_price.discount_start_date,
          item.product_price.discount_end_date,
          item.product_price.discount,
          item.product_price.actual_price,
          item.product_price.discount_type,
        );

        item.product_price.discount_price = discountDetails.discountPrice;
        item.product_price.discount_status = discountDetails.discountStatus;
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { productDetails },
      };
    } catch (err) {
      throw err;
    }
  }
}
