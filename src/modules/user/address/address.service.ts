import { Inject, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/core/constants/messages';
import { ADDRESS_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Address } from 'src/modules/address/address.entity';
import { NewAddress } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: typeof Address,
  ) {}

  async add(payload: NewAddress, user_id: number) {
    try {
      const latitude = parseFloat(payload.latitude);

      await this.addressRepository.create<any>({
        user_id,
        latitude,
        longitude: parseFloat(payload.longitude),
        ...payload,
      });

      return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS };
    } catch (err) {
      throw err;
    }
  }
}
