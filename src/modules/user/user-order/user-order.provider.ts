import { ORDER_PRODUCT_REPOSITORY, ORDER_REPOSITORY, PRODUCT_REPOSITORY } from "src/core/constants/repositories";
import { OrderProduct } from "src/modules/order/order-product.entity";
import { Order } from "src/modules/order/order.entity";
import { Product } from "src/modules/product/product.entity";

export const UserOrderProvider = [
  { provide: ORDER_REPOSITORY, useValue: Order },
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: ORDER_PRODUCT_REPOSITORY, useValue: OrderProduct }
];