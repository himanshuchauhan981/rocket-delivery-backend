const CONSTANTS = {
  ORDER_STATUS: 'status',
  PAYMENT_STATUS: 'payment_status',
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
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PICKED: 'PICKED',
  ON_THE_WAY: 'ON_THE_WAY',
  DELIVERED: 'DELIVERED',
  REQUESTED: 'REQUESTED',
  CANCELLED: 'CANCELLED',
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
};
