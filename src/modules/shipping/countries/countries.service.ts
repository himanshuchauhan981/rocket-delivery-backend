import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { MESSAGES } from 'src/core/constants/messages';
import { COUNTRIES_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { CountriesList } from 'src/modules/admin/shipping/countries/dto/countries.dto';
import { Countries } from './countries.entity';

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
}
