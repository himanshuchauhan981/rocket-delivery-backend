import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/core/constants/messages';
import sequelize from 'sequelize';

import { COUNTRIES_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Countries } from 'src/modules/countries/countries.entity';
import { ApiResponse } from '../dto/interface/admin';
import { CountriesList } from './dto/countries.dto';

@Injectable()
export class AdminCountriesService {
  constructor(
    @Inject(COUNTRIES_REPOSITORY)
    private readonly countriesRepositories: typeof Countries,
  ) {}
  async findAll(payload: CountriesList) {
    try {
      payload.pageIndex = payload.pageIndex * payload.pageSize;

      const query: any = [{ is_deleted: 0 }];

      if (payload.search) {
        query.push({
          name: {
            [sequelize.Op.iLike]: `%${payload.search}%`,
          },
        });
      }

      const countries = await this.countriesRepositories.findAndCountAll({
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
      const [updateStatus] = await this.countriesRepositories.update(
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

  async delete(id: number): Promise<ApiResponse> {
    try {
      const [updateStatus] = await this.countriesRepositories.update(
        { is_deleted: 1 },
        { where: { id } },
      );

      if (!updateStatus) {
        throw new HttpException(
          MESSAGES.COUNTRY_NOT_FOUND,
          STATUS_CODE.BAD_REQUEST,
        );
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.COUNTRY_DELETE_SUCCESSFULL,
      };
    } catch (err) {
      throw err;
    }
  }
}
