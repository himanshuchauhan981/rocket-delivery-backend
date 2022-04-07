import { Module } from '@nestjs/common';

import { UserAddressController } from './address.controller';
import { UserAddressProvider } from './address.provider';
import { AddressService } from './address.service';
import { AddressService as CommonAddressService } from '../../address/address.service';

@Module({
  controllers: [UserAddressController],
  providers: [AddressService, CommonAddressService, ...UserAddressProvider],
})
export class UserAddressModule {}
