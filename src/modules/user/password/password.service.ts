import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as otpGenerator from 'otp-generator';

import { MESSAGES } from 'src/core/constants/messages';
import { USER_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import {
  MailService,
  MailServiceInput,
} from 'src/core/utils/mail/mail.service';
import { CommonService } from 'src/modules/common/common.service';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { User } from '../user.entity';
import { ForgetPasswordResponse } from './dto/password-response.entity';
import { VerifyPassword } from './dto/password.entity';

@Injectable()
export class PasswordService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly mailService: MailService,
    private readonly commonService: CommonService,
  ) {}

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

    return this.userRepository.update(
      { otp, otp_validity: otpValidity },
      { where: { email }, returning: true },
    );
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

  async verifyPassword(payload: VerifyPassword): Promise<APIResponse> {
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
}
