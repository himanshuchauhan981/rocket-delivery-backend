import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';

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
import { OrderProduct } from '../order/order-product.entity';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { Admin } from './admin.entity';
import { AdminLogin } from './dto/admin.dto';
import {
  AdminDashboardResponse,
  AdminDetailsResponse,
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

  async #categoryWiseSales(): Promise<Category[]> {
    return this.categoryRepository.findAll({
      where: { is_deleted: 0 },
      include: [
        {
          model: Product,
          include: [{ model: OrderProduct, attributes: [] }],
          attributes: [],
        },
      ],
      attributes: [
        'id',
        'name',
        [
          sequelize.fn('COUNT', sequelize.col('categoryProducts.id')),
          'totalSale',
        ],
      ],
      group: ['categoryProducts.category_id', 'Category.name', 'Category.id'],
    });
  }

  async #findWeeklyOrderSales(): Promise<Order[]> {
    const dateTo = moment().format('YYYY-MM-DD HH:mm:ss');
    const dateFrom = moment()
      .subtract(2, 'month')
      .format('YYYY-MM-DD HH:mm:ss');

    return this.orderRepository.sequelize.query(
      `
        SELECT
          COUNT(created_at) AS totalSales,
          TO_DATE(cast(created_at as TEXT), 'YYYY/MM/DD') AS orderDate
        FROM
          orders
        WHERE
          created_at BETWEEN '${dateFrom}' AND '${dateTo}'
        GROUP BY
          orderDate
        ORDER BY
          orderDate ASC;
      `,
      { type: sequelize.QueryTypes.SELECT },
    );
  }

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

  async dashboardDetails(): Promise<AdminDashboardResponse> {
    try {
      const totalUsers = await this.userRepository.count({
        where: { is_deleted: 0 },
      });

      const categoryWiseSales = await this.#categoryWiseSales();

      const totalOrders = await this.orderRepository.count();

      const totalProducts = await this.productRepository.count({
        where: { is_deleted: 0 },
      });

      const weeklyOrderSales = await this.#findWeeklyOrderSales();

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: {
          totalOrders,
          totalCategories: categoryWiseSales.length,
          totalUsers,
          totalProducts,
          categoryWiseSales: categoryWiseSales,
          weeklyOrderSales,
        },
      };
    } catch (err) {
      throw err;
    }
  }
}
