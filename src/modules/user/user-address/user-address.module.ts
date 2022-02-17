import { Module } from '@nestjs/common';

import { AddressService } from 'src/modules/address/address.service';
import { UserAddressController } from './user-address.controller';
import { UserAddressProvider } from './user-address.provider';

@Module({
  controllers: [UserAddressController],
  providers: [AddressService, ...UserAddressProvider],
})
export class UserAddressModule {}
