import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

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

  async findAllByUserId(userId: number) {
    try {
      const addressList = await this.addressRepository.findAll({
        where: { [sequelize.Op.and]: [{ is_deleted: 0 }, { user_id: userId }] },
        attributes: [
          'id',
          'full_name',
          'pincode',
          'house_no',
          'area',
          'city',
          'state',
          'landmark',
          'latitude',
          'longitude',
          'country_code',
          'mobile_number',
        ],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { addressList },
      };
    } catch (err) {
      throw err;
    }
  }
}
