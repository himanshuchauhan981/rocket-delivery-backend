const CONSTANTS = {
  ORDER_STATUS: 'status',
  PAYMENT_STATUS: 'payment_status',
  DELIVERY_STATUS: 'delivery_status',
};

const FILE_SLUGS = {
  CATEGORY: 'category',
  SUB_CATEGORY: 'sub-category',
  PRODUCT: 'product',
};

const FILE_TYPES = {
  IMAGE: 'image',
};

const ORDER_STATUS = {
  CONFIRMED: 'CONFIRMED',
  DELIVERED: 'DELIVERED',
  REQUESTED: 'REQUESTED',
  CANCELLED: 'CANCELLED',
};

const DELIVERY_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PICKED: 'PICKED',
  ON_THE_WAY: 'ON_THE_WAY',
  DELIVERED: 'DELIVERED',
};

const ORDER_PAYMENT_STATUS = {
  PAID: 'PAID',
  UNPAID: 'UNPAID',
};

const USER_PAYMENT_STATUS = {
  INITIATED: 'INITIATED',
  REFUNDED: 'REFUNDED',
  CAPTURED: 'CAPTURED',
};

const NOTIFICATION_SLUG = {
  ORDER_REQUESTED: 'ORDER_REQUESTED',
  ORDER_CANCELLED: 'ORDER_CANCELLED',
};

const USER_TYPE = {
  ADMIN: 'admin',
  USER: 'user',
};

const NOTIFICATION_TYPE = {
  ORDER_REQUEST: 'order_request',
  ORDER_CONFIRM: 'order_confirm',
  ORDER_CANCEL: 'order_cancel',
};

const RESPONSE_TYPE = {
  BLOB: 'BLOB',
  CSV: 'CSV',
};

const FILE_EXTENSIONS = {
  JPEG: 'jpeg',
  JPG: 'jpg',
  PNG: 'png',
};

const FILE_FILTER_BY = {
  1: 'category',
  2: 'sub-category',
  3: 'product',
};

const FILE_SORT_BY = {
  0: { field: 'id', method: 'ASC' },
  1: { field: 'created_at', method: 'DESC' },
  2: { field: 'created_at', method: 'ASC' },
  3: { field: 'size', method: 'ASC' },
  4: { field: 'size', method: 'DESC' },
};

const NOTIFICATION_TEMPLATE_SLUG = {
  ORDER_REQUESTED: 'ORDER_REQUESTED',
  ORDER_CONFIRMED: 'ORDER_CONFIRMED',
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  ORDER_DELIVERED: 'ORDER_DELIVERED',
  DELIVERY_CONFIRMED: 'DELIVERY_CONFIRMED',
  DELIVERY_PICKED: 'DELIVERY_PICKED',
  DELIVERY_ON_THE_WAY: 'DELIVERY_ON_THE_WAY',
  DELIVERY_COMPLETED: 'DELIVERY_COMPLETED',
};

const STOCK_VISIBILITY_SLUG = {
  STOCK_QUANTITY: 'STOCK_QUANTITY',
  STOCK_TEXT: 'STOCK_TEXT',
  HIDE_STOCK: 'HIDE_STOCK',
};

const PAYMENT_METHOD_SLUG = {
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
  DEBIT_OR_CREDIT: 'DEBIT_OR_CREDIT',
  BOTH: 'BOTH',
};

export {
  CONSTANTS,
  FILE_SLUGS,
  FILE_TYPES,
  ORDER_STATUS,
  ORDER_PAYMENT_STATUS,
  USER_PAYMENT_STATUS,
  NOTIFICATION_SLUG,
  USER_TYPE,
  NOTIFICATION_TYPE,
  RESPONSE_TYPE,
  FILE_EXTENSIONS,
  FILE_FILTER_BY,
  FILE_SORT_BY,
  DELIVERY_STATUS,
  NOTIFICATION_TEMPLATE_SLUG,
  STOCK_VISIBILITY_SLUG,
  PAYMENT_METHOD_SLUG,
};
