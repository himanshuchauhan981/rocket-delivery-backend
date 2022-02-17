import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';

import { WISHLIST_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { File } from '../admin/file/file.entity';
import { Product } from '../product/product.entity';
import { NewWishlistItem } from '../user/user-wishlist/entity/wishlist.dto';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @Inject(WISHLIST_REPOSITORY)
    private readonly wishlistRepository: typeof Wishlist,
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
            include: [{ model: File, attributes: ['id', 'url'] }],
          },
        ],
        attributes: ['id'],
      });

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
}
