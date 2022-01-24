import { Module } from '@nestjs/common';
import { AddressProvider } from './address.provider';
import { AddressService } from './address.service';

@Module({
  providers: [AddressService, ...AddressProvider]
})
export class AddressModule {}
