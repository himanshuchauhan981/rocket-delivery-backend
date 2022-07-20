import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';
import * as otpGenerator from 'otp-generator';

import { MESSAGES } from '../../core/constants/messages';
import {
  CATEGORY_REPOSITORY,
  USER_REPOSITORY,
} from '../../core/constants/repositories';
import { STATUS_CODE } from '../../core/constants/status_code';
import { ApiResponse } from '../admin/dto/interface/admin';
import { File } from '../admin/file/file.entity';
import { Category } from '../category/category.entity';
import { CommonService } from '../common/common.service';
import {
  ForgetPasswordResponse,
  ListCategoriesResponse,
  LoginUserResponse,
  NewUserResponse,
  UserDetailsResponse,
} from './dto/interface';
import {
  VerifyPassword,
  UpdateProfile,
  UserLogin,
  UserSignup,
} from './dto/user.dto';
import { User } from './user.entity';
import {
  MailService,
  MailServiceInput,
} from '../../core/utils/mail/mail.service';
import { USER_TYPE } from '../../core/constants/constants';
import { Address } from '../address/address.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly commonService: CommonService,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    private readonly mailService: MailService,
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

  #generateUserPasswordOTP(): string {
    return otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
  }

  async #updateUserOTP(email: string): Promise<[number, User[]]> {
    const otp = this.#generateUserPasswordOTP();
    const otpValidity = moment().add(2, 'minutes');

    return await this.userRepository.update(
      { otp, otp_validity: otpValidity },
      { where: { email }, returning: true },
    );
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
        role: USER_TYPE.USER,
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
        attributes: [
          'name',
          'email',
          'mobile_number',
          'country_code',
          'id',
          'is_active',
          'created_at',
        ],
        include: [
          {
            model: Address,
            attributes: [
              'id',
              'full_name',
              'pincode',
              'house_no',
              'area',
              // 'city',
              // 'state',
              'mobile_number',
              'landmark',
            ],
          },
        ],
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

  async forgetPassword(email: string): Promise<ForgetPasswordResponse> {
    try {
      const userDetails = await this.userRepository.findOne({
        where: { email },
      });

      if (!userDetails) {
        throw new HttpException(
          MESSAGES.NON_EXISTED_EMAIL,
          STATUS_CODE.NOT_FOUND,
        );
      }

      const forgetPasswordEmailObj: MailServiceInput = {
        subject: 'Forget password email',
        receivers: [userDetails.email],
        template: 'resetPassword',
        templateContext: {
          username: userDetails.name,
          otp: '',
        },
      };

      if (userDetails.otp && userDetails.otp_validity) {
        let otpValidity: string;

        const currentDate = moment().toISOString();

        const validityStatus = moment(userDetails.otp_validity).isBefore(
          currentDate,
        );

        if (validityStatus) {
          const otpDetails = await this.#updateUserOTP(email);

          forgetPasswordEmailObj.templateContext.otp = otpDetails[1][0].otp;

          await this.mailService.sendMail(forgetPasswordEmailObj);

          otpValidity = otpDetails[1][0].otp_validity;
        } else {
          otpValidity = userDetails.otp_validity;
        }

        return {
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.FORGET_PASSWORD_SUCCESS,
          data: { otpValidity, id: userDetails.id },
        };
      }

      const otpDetails = await this.#updateUserOTP(email);

      forgetPasswordEmailObj.templateContext.otp = otpDetails[1][0].otp;

      await this.mailService.sendMail(forgetPasswordEmailObj);

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.FORGET_PASSWORD_SUCCESS,
        data: {
          otpValidity: otpDetails[1][0].otp_validity,
          id: userDetails.id,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  async verifyPassword(payload: VerifyPassword): Promise<ApiResponse> {
    try {
      const userDetails = await this.userRepository.findOne({
        where: { email: payload.email },
      });

      if (userDetails) {
        if (payload.otp === userDetails.otp) {
          return {
            statusCode: STATUS_CODE.SUCCESS,
            message: MESSAGES.RESET_PASSWORD_SUCCESS,
          };
        }
        return {
          statusCode: STATUS_CODE.BAD_REQUEST,
          message: MESSAGES.INCORRECT_OTP,
        };
      }

      return {
        statusCode: STATUS_CODE.NOT_FOUND,
        message: MESSAGES.INVALID_EMAIL,
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
}
