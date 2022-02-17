import {
  USER_PAYMENT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants/repositories';
import { UserPayment } from 'src/modules/payment/user-payment.entity';
import { User } from '../user.entity';

export const UserPaymentProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: USER_PAYMENT_REPOSITORY, useValue: UserPayment },
];
