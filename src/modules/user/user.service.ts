import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';

import {
  CATEGORY_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { UsersList } from '../admin/admin-users/dto/admin-users.entity';
import { ApiResponse } from '../admin/dto/interface/admin';
import { File } from '../admin/file/file.entity';
import { Category } from '../category/category.entity';
import { CommonService } from '../common/common.service';
import {
  ListCategoriesResponse,
  ListUsersResponse,
  LoginUserResponse,
  NewUserResponse,
  UserDetailsResponse,
} from './dto/interface';
import { UpdateProfile, UserLogin, UserSignup } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly commonService: CommonService,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
  ) {}

  async #findExistingUser(
    email: string,
    mobileNumber: string = null,
  ): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        [sequelize.Op.or]: [
          { email: email },
          { mobile_number: mobileNumber ? mobileNumber : null },
        ],
      },
      attributes: [
        'email',
        'password',
        'mobile_number',
        'name',
        'id',
        'profile_image',
      ],
    });
  }

  async signup(payload: UserSignup): Promise<NewUserResponse> {
    try {
      const userDetails = await this.#findExistingUser(
        payload.email,
        payload.mobile_number,
      );

      if (userDetails) {
        throw new HttpException(
          MESSAGES.USER_ALREADY_EXISTED,
          STATUS_CODE.CONFLICT,
        );
      }

      const hashedPassword = await this.commonService.generateHashPassword(
        payload.password,
      );

      const newUser = await this.userRepository.create<any>({
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        country_code: payload.country_code,
        mobile_number: payload.mobile_number,
        type: payload.type,
        fcm_token: payload.fcm_token,
      });

      const token = this.commonService.generateJWTToken({
        id: newUser.id,
        role: 'user',
        email: payload.email,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { token, name: payload.name },
      };
    } catch (err) {
      throw err;
    }
  }

  async login(payload: UserLogin): Promise<LoginUserResponse> {
    try {
      const existingUser = await this.#findExistingUser(payload.email);

      if (!existingUser) {
        throw new HttpException(
          MESSAGES.INVALID_CREDS,
          STATUS_CODE.UNAUTHORIZED,
        );
      }

      const comparedPassword = await this.commonService.comparePassword(
        payload.password,
        existingUser.password,
      );

      if (!comparedPassword) {
        throw new HttpException(
          MESSAGES.INVALID_CREDS,
          STATUS_CODE.UNAUTHORIZED,
        );
      }

      const token = await this.commonService.generateJWTToken({
        id: existingUser.id,
        role: 'user',
        email: payload.email,
      });

      await this.userRepository.update(
        { fcm_token: payload.fcm_token },
        { where: { id: existingUser.id } },
      );

      return {
        statusCode: STATUS_CODE.SUCCESS,
        data: {
          token,
          name: existingUser.name,
          profile_photo: existingUser.profile_image,
        },
        message: MESSAGES.SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async listCategories(limit: number): Promise<ListCategoriesResponse> {
    try {
      const categoryList = await this.categoryRepository.findAll({
        where: { [sequelize.Op.and]: [{ is_active: 1 }, { is_deleted: 0 }] },
        attributes: ['id', 'name', 'is_sub_category'],
        limit: limit == 0 ? 10000 : limit,
        include: [{ model: File, attributes: ['url', 'id'] }],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { categoryList: categoryList },
      };
    } catch (err) {
      throw err;
    }
  }

  async getUserDetails(user_id: number): Promise<UserDetailsResponse> {
    try {
      const userDetails = await this.userRepository.findByPk(user_id, {
        attributes: ['name', 'email', 'mobile_number'],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { userDetails },
      };
    } catch (err) {
      throw err;
    }
  }

  async updateUserDetails(
    payload: UpdateProfile,
    id: number,
  ): Promise<ApiResponse> {
    try {
      const existingUser = await this.userRepository.findByPk(id);

      if (existingUser && existingUser.id != id) {
        throw new HttpException(
          MESSAGES.NEW_EMAIL_EXISTED,
          STATUS_CODE.CONFLICT,
        );
      }

      if (payload.password && existingUser) {
        const hashedPassword = await this.commonService.generateHashPassword(
          payload.password,
        );

        await this.userRepository.update(
          { password: hashedPassword },
          { where: { id } },
        );
        return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
      }

      await this.userRepository.update(
        {
          email: payload.email,
          mobile_number: payload.mobile_number,
          name: payload.name,
        },
        { where: { id } },
      );

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.USER_PROFILE_UPDATE_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async listUsers(payload: UsersList): Promise<ListUsersResponse> {
    try {
      const pageIndex = payload.pageIndex * payload.pageSize;

      const query: any = [{ is_deleted: 0 }];
      if (payload.search && payload.search !== '') {
        query.push({
          [sequelize.Op.or]: [
            { name: { [sequelize.Op.iLike]: `%${payload.search}%` } },
            { email: { [sequelize.Op.iLike]: `%${payload.search}%` } },
          ],
        });
      }

      const userList = await this.userRepository.findAndCountAll({
        where: { [sequelize.Op.and]: query },
        attributes: [
          'id',
          'name',
          'email',
          'created_at',
          'mobile_number',
          'is_active',
          'profile_image',
        ],
        order: [[payload.sortColumn, payload.sortBy]],
        offset: pageIndex,
        limit: payload.pageSize,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { userList: userList.rows, count: userList.count },
      };
    } catch (err) {
      throw err;
    }
  }

  async resetPassword(id: number, newPassword: string): Promise<ApiResponse> {
    try {
      const userData = await this.userRepository.findByPk(id);

      if (!userData) {
        throw new HttpException(
          MESSAGES.INVALID_USER_ID,
          STATUS_CODE.NOT_FOUND,
        );
      } else if (!userData.is_active) {
        throw new HttpException(
          MESSAGES.PASSWORD_UPDATE_ON_DISABLED_USER,
          STATUS_CODE.BAD_REQUEST,
        );
      }
      const hashedPassword = await this.commonService.generateHashPassword(
        newPassword,
      );

      await this.userRepository.update(
        { password: hashedPassword },
        { where: { id } },
      );

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.ADMIN_PASSWORD_RESET_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async updateUserStatus(id: number, is_active: number): Promise<ApiResponse> {
    try {
      const updatedUser = await this.userRepository.update(
        { is_active },
        { where: { id }, returning: true },
      );

      if (!updatedUser) {
        throw new HttpException(
          MESSAGES.INVALID_USER_ID,
          STATUS_CODE.NOT_FOUND,
        );
      }

      if (updatedUser[1][0].is_active) {
        return {
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.USER_ENABLED,
        };
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.USER_DISABLED,
      };
    } catch (err) {
      throw err;
    }
  }
}
