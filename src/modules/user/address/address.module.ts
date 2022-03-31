import { Module } from '@nestjs/common';

import { AddressService } from 'src/modules/address/address.service';
import { UserAddressController } from './address.controller';
import { UserAddressProvider } from './address.provider';

@Module({
  controllers: [UserAddressController],
  providers: [AddressService, ...UserAddressProvider],
})
export class UserAddressModule {}
