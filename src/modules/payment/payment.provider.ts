import {
  USER_PAYMENT_REPOSITORY,
  USER_REPOSITORY,
} from '../../core/constants/repositories';
import { User } from '../user/user.entity';
import { UserPayment } from './user-payment.entity';

export const PaymentProvider = [
  { provide: USER_REPOSITORY, useValue: User },
  { provide: USER_PAYMENT_REPOSITORY, useValue: UserPayment },
];
