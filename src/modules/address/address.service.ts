import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';

import { ADDRESS_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { NewAddress } from '../user/address/dto/address.dto';
import { Address } from './address.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: typeof Address,
  ) {}

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

  async update(payload: NewAddress, id: number) {
    try {
      const addressDetails = await this.addressRepository.findByPk(id);

      if (!addressDetails) {
        throw new HttpException(
          MESSAGES.USER_ADDRESS_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      } else {
        await this.addressRepository.update<any>(payload, { where: { id } });
        return {
          statusCode: STATUS_CODE.SUCCESS,
          message: MESSAGES.ADDRESS_UPDATED_SUCCESSFULLY,
        };
      }
    } catch (err) {
      throw err;
    }
  }
}
