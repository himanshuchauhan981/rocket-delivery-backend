import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MESSAGES } from 'src/core/constants/messages';

import { ADMIN_REPOSITORY } from 'src/core/constants/repositories';
import { CommonService } from '../common/common.service';
import { Admin } from './admin.entity';
import { AdminLogin } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject(ADMIN_REPOSITORY) private readonly adminRepository: typeof Admin,
    private readonly commonService: CommonService,
  ) {}

  async login(payload: AdminLogin) {
    const adminDetails = await this.adminRepository.findOne({
      where: { email: payload.email },
    });

    if (adminDetails) {
      const passwordStatus = this.commonService.comparePassword(
        payload.password,
        adminDetails.password,
      );

      if (passwordStatus) {
        const token = this.commonService.generateJWTToken({
          id: adminDetails.id,
        });

        return { data: { token } };
      } else throw new UnauthorizedException(MESSAGES.INVALID_CREDS);
    } else throw new UnauthorizedException(MESSAGES.INVALID_CREDS);
  }
}
