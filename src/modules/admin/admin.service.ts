import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { MESSAGES } from 'src/core/constants/messages';

import {
  ADMIN_REPOSITORY,
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Category } from '../category/category.entity';
import { CommonService } from '../common/common.service';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { Admin } from './admin.entity';
import { AdminLogin } from './dto/admin.dto';
import {
  AdminDashboardResponse,
  AdminLoginResponse,
} from './dto/interface/admin';

@Injectable()
export class AdminService {
  constructor(
    @Inject(ADMIN_REPOSITORY) private readonly adminRepository: typeof Admin,
    private readonly commonService: CommonService,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: typeof Order,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
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

  async adminDetails(id: number) {
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

  async dashboardDetails(): Promise<AdminDashboardResponse> {
    try {
      const totalUsers = await this.userRepository.count({
        where: { is_deleted: 0 },
      });

      const totalCategories = await this.categoryRepository.count({
        where: { is_deleted: 0 },
      });

      const totalOrders = await this.orderRepository.count();

      const totalProducts = await this.productRepository.count({
        where: { is_deleted: 0 },
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { totalOrders, totalCategories, totalUsers, totalProducts },
      };
    } catch (err) {
      throw err;
    }
  }
}
