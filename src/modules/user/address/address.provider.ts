import { ADDRESS_REPOSITORY } from 'src/core/constants/repositories';
import { Address } from 'src/modules/address/address.entity';

export const UserAddressProvider = [
  { provide: ADDRESS_REPOSITORY, useValue: Address },
];
