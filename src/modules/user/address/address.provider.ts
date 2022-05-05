import { ADDRESS_REPOSITORY } from '../../../core/constants/repositories';
import { Address } from '../../../modules/address/address.entity';

export const UserAddressProvider = [
  { provide: ADDRESS_REPOSITORY, useValue: Address },
];
