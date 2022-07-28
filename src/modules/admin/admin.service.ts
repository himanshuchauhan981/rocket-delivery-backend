import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { MESSAGES } from '../../core/constants/messages';
import { ADMIN_REPOSITORY } from '../../core/constants/repositories';
import { STATUS_CODE } from '../../core/constants/status_code';
import { CommonService } from '../common/common.service';
import { APIResponse } from '../common/dto/common.dto';
import { Admin } from './admin.entity';
import {
  AdminDetailsResponse,
  AdminLogin,
  AdminLoginSuccessResponse,
} from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject(ADMIN_REPOSITORY) private readonly adminRepository: typeof Admin,
    private readonly commonService: CommonService,
  ) {}

  async login(
    payload: AdminLogin,
  ): Promise<AdminLoginSuccessResponse | APIResponse> {
    const adminDetails = await this.adminRepository.findOne({
      where: { email: payload.email },
    });

    if (!adminDetails) {
      throw new UnauthorizedException(MESSAGES.INVALID_CREDS);
    }

    const passwordStatus = await this.commonService.comparePassword(
      payload.password,
      adminDetails.password,
    );

    if (!passwordStatus) {
      throw new UnauthorizedException(MESSAGES.INVALID_CREDS);
    }

    const token = this.commonService.generateJWTToken({
      id: adminDetails.id,
      role: 'admin',
      email: payload.email,
    });

    return {
      statusCode: STATUS_CODE.SUCCESS,
      message: MESSAGES.SUCCESS,
      data: { token },
    };
  }

  async adminDetails(id: number): Promise<AdminDetailsResponse> {
    try {
      const adminDetails = await this.adminRepository.findByPk(id, {
        attributes: ['id', 'email'],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { adminDetails },
      };
    } catch (err) {
      throw err;
    }
  }
}
