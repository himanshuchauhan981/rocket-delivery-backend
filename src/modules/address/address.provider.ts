import { ADDRESS_REPOSITORY } from '../../core/constants/repositories';
import { Address } from './address.entity';

export const AddressProvider = [
  { provide: ADDRESS_REPOSITORY, useValue: Address },
];
