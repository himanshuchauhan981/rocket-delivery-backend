import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';

import {
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { Category } from 'src/modules/category/category.entity';
import { OrderProduct } from 'src/modules/order/order-product.entity';
import { Order } from 'src/modules/order/order.entity';
import { Product } from 'src/modules/product/product.entity';
import { User } from 'src/modules/user/user.entity';
import { AdminDashboardResponse } from './dto/dashboard';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { MESSAGES } from 'src/core/constants/messages';

@Injectable()
export class DashboardService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: typeof Order,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: typeof Product,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: typeof Category,
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

  async dashboardSalesDetails(): Promise<AdminDashboardResponse> {
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

  async dashboardOrderDetails() {
    try {
      const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
      const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

      const orderDetails = await this.orderRepository.findAll({
        where: {
          created_at: {
            [sequelize.Op.between]: [startOfYear, endOfYear],
          },
        },
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
          'status',
        ],
        group: ['status'],
      });

      const startOfWeek = '2022-02-27';
      const endOfWeek = '2022-03-05';

      const orderRevenue = await this.orderRepository.sequelize.query(
        `
          SELECT
            SUM(net_amount) AS "totalRevenue",
            TO_DATE(cast(created_at as TEXT), 'YYYY/MM/DD') AS "orderDate"
          FROM
            orders
          WHERE
            created_at BETWEEN '${startOfWeek}' AND '${endOfWeek}'
          GROUP BY
            "orderDate"
          ORDER BY
            "orderDate" ASC;
        `,
        { type: sequelize.QueryTypes.SELECT },
      );

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: {
          orderDetails,
          orderRevenue,
        },
      };
    } catch (err) {
      throw err;
    }
  }
}
