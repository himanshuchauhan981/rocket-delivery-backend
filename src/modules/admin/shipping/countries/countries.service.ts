import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { MESSAGES } from 'src/core/constants/messages';
import { COUNTRIES_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Countries } from 'src/modules/shipping/countries.entity';
import { ApiResponse } from '../../dto/interface/admin';
import { CountriesList, EditCountry } from './dto/countries.dto';

@Injectable()
export class CountriesService {
  constructor(
    @Inject(COUNTRIES_REPOSITORY)
    private readonly countriesRepository: typeof Countries,
  ) {}

  async findAll(payload: CountriesList) {
    try {
      payload.pageIndex = payload.pageIndex * payload.pageSize;

      const query: any = [];

      if (payload.search) {
        query.push({
          name: {
            [sequelize.Op.iLike]: `%${payload.search}%`,
          },
        });
      } else if (payload.isActive) {
        query.push({
          is_active: payload.isActive,
        });
      }

      const countries = await this.countriesRepository.findAndCountAll({
        where: { [sequelize.Op.and]: query },
        order: [['name', 'ASC']],
        offset: payload.pageIndex,
        limit: payload.pageSize,
        attributes: ['id', 'name', 'iso_code', 'is_active'],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { countries: countries.rows, count: countries.count },
      };
    } catch (err) {
      throw err;
    }
  }

  async statusUpdate(country_id: number, status: number): Promise<ApiResponse> {
    try {
      const [updateStatus] = await this.countriesRepository.update(
        { is_active: status },
        { where: { id: country_id } },
      );

      if (!updateStatus) {
        throw new HttpException(
          MESSAGES.COUNTRY_NOT_FOUND,
          STATUS_CODE.BAD_REQUEST,
        );
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.COUNTRY_STATUS_UPDATE_SUCCESS,
      };
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, payload: EditCountry): Promise<ApiResponse> {
    try {
      const updatePayload: any = {};

      if (payload.name) {
        updatePayload.name = payload.name;
      } else if (payload.status) {
        updatePayload.is_active = payload.status;
      }

      const [updateStatus] = await this.countriesRepository.update(
        updatePayload,
        { where: { id } },
      );

      if (!updateStatus) {
        throw new HttpException(
          MESSAGES.COUNTRY_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.COUNTRY_UPDATE_SUCCESSFULL,
      };
    } catch (err) {
      throw err;
    }
  }
}
