import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import * as moment from 'moment';

import {
  CATEGORY_REPOSITORY,
  ORDER_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from '../../../core/constants/repositories';
import { Category } from '../../../modules/category/category.entity';
import { OrderProduct } from '../../../modules/order/order-product.entity';
import { Order } from '../../../modules/order/order.entity';
import { Product } from '../../../modules/product/product.entity';
import { User } from '../../../modules/user/user.entity';
import { ProductPrice } from '../../../modules/product/product-price.entity';
import { File } from '../file/file.entity';
import {
  AdminDashboardOrderResponse,
  AdminDashboardProductResponse,
  AdminDashboardSalesResponse,
} from './interface/admin-dashboard-response.dto';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { MESSAGES } from '../../../core/constants/messages';

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

  async dashboardSalesDetails(): Promise<AdminDashboardSalesResponse> {
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

  async dashboardOrderDetails(): Promise<AdminDashboardOrderResponse> {
    try {
      const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
      const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

      const orderDetails: any = await this.orderRepository.findAll({
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

      const orderRevenue: any = await this.orderRepository.sequelize.query(
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

  async productDetails(): Promise<AdminDashboardProductResponse> {
    try {
      const recentProducts = await this.productRepository.findAll({
        where: { is_deleted: 0 },
        include: [
          {
            model: ProductPrice,
            attributes: [
              'actual_price',
              'discount',
              'discount_type',
              'discount_start_date',
              'discount_end_date',
            ],
          },
          { model: File, attributes: ['id', 'url'] },
        ],
        attributes: ['id', 'name', 'max_quantity'],
        order: [['created_at', 'DESC']],
        limit: 7,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: {
          recentProducts,
        },
      };
    } catch (err) {
      throw err;
    }
  }
}
