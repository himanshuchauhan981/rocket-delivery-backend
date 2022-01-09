import { Inject, Injectable } from '@nestjs/common';

import { ADMIN_REPOSITORY } from 'src/core/constants/repositories';
import { Admin } from './admin.entity';
import { AdminLogin } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject(ADMIN_REPOSITORY) private readonly adminRepository: typeof Admin,
  ) {}
  async login(payload: AdminLogin) {
    const adminDetails = await this.adminRepository.findOne({
      where: { email: payload.email },
    });

    if (adminDetails) {
    }
  }
}
