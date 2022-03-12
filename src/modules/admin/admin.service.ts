import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { MESSAGES } from 'src/core/constants/messages';

import { ADMIN_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { CommonService } from '../common/common.service';
import { Admin } from './admin.entity';
import { AdminLogin } from './dto/admin.dto';
import { AdminLoginResponse } from './dto/interface/admin';

@Injectable()
export class AdminService {
  constructor(
    @Inject(ADMIN_REPOSITORY) private readonly adminRepository: typeof Admin,
    private readonly commonService: CommonService,
  ) {}

  async login(payload: AdminLogin): Promise<AdminLoginResponse> {
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
}
