import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { ApiResponse } from 'src/modules/admin/dto/interface/admin';
import { Cities } from 'src/modules/shipping/cities/cities.entity';
import { Countries } from 'src/modules/shipping/countries/countries.entity';
import { States } from 'src/modules/shipping/states/states.entity';
import { MESSAGES } from '../../../core/constants/messages';
import {
  ADDRESS_REPOSITORY,
  CITIES_REPOSITORY,
  COUNTRIES_REPOSITORY,
  STATES_REPOSITORY,
} from '../../../core/constants/repositories';
import { STATUS_CODE } from '../../../core/constants/status_code';
import { Address } from '../../../modules/address/address.entity';
import { NewAddress } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: typeof Address,
    @Inject(COUNTRIES_REPOSITORY)
    private readonly countriesRepository: typeof Countries,
    @Inject(STATES_REPOSITORY)
    private readonly statesRepository: typeof States,
    @Inject(CITIES_REPOSITORY)
    private readonly citiesRepository: typeof Cities,
  ) {}

  async add(payload: NewAddress, user_id: number): Promise<ApiResponse> {
    try {
      const existingCountry = await this.countriesRepository.findByPk(
        payload.country_id,
      );

      if (!existingCountry) {
        throw new HttpException(
          MESSAGES.COUNTRY_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      const existingState = await this.statesRepository.findByPk(
        payload.state_id,
      );

      if (!existingState) {
        throw new HttpException(
          MESSAGES.STATE_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      const existingCity = await this.citiesRepository.findByPk(
        payload.city_id,
      );

      if (!existingCity) {
        throw new HttpException(MESSAGES.CITY_NOT_FOUND, STATUS_CODE.NOT_FOUND);
      }

      await this.addressRepository.create<any>({
        user_id,
        latitude: parseFloat(payload.latitude),
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
          'landmark',
          'latitude',
          'longitude',
          'mobile_number',
        ],
        include: [
          { model: States, attributes: ['id', 'name'] },
          { model: Cities, attributes: ['id', 'name'] },
          { model: Countries, attributes: ['id', 'name'] },
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
