import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { MESSAGES } from '../../../core/constants/messages';
import { WISHLIST_REPOSITORY } from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { File } from '../../../modules/admin/file/file.entity';
import { ProductPrice } from '../../../modules/product/product-price.entity';
import { Product } from '../../../modules/product/product.entity';
import { Wishlist } from '../../../modules/wishlist/wishlist.entity';
import { NewWishlistItem } from './entity/wishlist.dto';
import { ProductService as CommonProductService } from '../../product/product.service';

@Injectable()
export class WishlistService {
  constructor(
    @Inject(WISHLIST_REPOSITORY)
    private readonly wishlistRepository: typeof Wishlist,
    private readonly commonProductService: CommonProductService,
  ) {}

  async findAll(user_id: number) {
    try {
      const userWishlist = await this.wishlistRepository.findAll({
        where: {
          [sequelize.Op.and]: [{ user_id }, { is_deleted: 0 }],
        },
        include: [
          {
            model: Product,
            attributes: ['id', 'name'],
            include: [
              { model: File, attributes: ['id', 'url'] },
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
            ],
          },
        ],
        attributes: ['id'],
      });

      for (const item of userWishlist) {
        const productPrice = item.product.product_price;

        const discountDetails =
          this.commonProductService.calculateDiscountPrice(
            productPrice.discount_start_date,
            productPrice.discount_end_date,
            productPrice.discount,
            productPrice.actual_price,
            productPrice.discount_type,
          );

        item.product.product_price.discount = discountDetails.discountPrice;
        item.product.product_price.discount_status =
          discountDetails.discountStatus;
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { userWishlist },
      };
    } catch (err) {
      throw err;
    }
  }

  async create(payload: NewWishlistItem, user_id: number) {
    try {
      const existingWishlistItem = await this.wishlistRepository.findOne({
        where: {
          [sequelize.Op.and]: [
            { product_id: payload.product_id },
            { user_id },
            { is_deleted: 0 },
          ],
        },
        attributes: ['id'],
      });

      if (!existingWishlistItem) {
        await this.wishlistRepository.create<any>({
          product_id: payload.product_id,
          user_id,
        });

        return {
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.WISHLIST_CREATED_SUCCESS,
        };
      } else {
        throw new HttpException(
          MESSAGES.EXISTED_USER_WISHLIST,
          STATUS_CODE.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      await this.wishlistRepository.update(
        { is_deleted: 1 },
        { where: { id } },
      );

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.WISHLIST_DELETE_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async findOne(wishlistId: number, userId: number) {
    try {
      const wishlistItem = await this.wishlistRepository.findOne({
        where: {
          [sequelize.Op.and]: [
            { product_id: wishlistId },
            { user_id: userId },
            { is_deleted: 0 },
          ],
        },
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: {
          wishlist: wishlistItem,
        },
      };
    } catch (err) {
      throw err;
    }
  }
}
