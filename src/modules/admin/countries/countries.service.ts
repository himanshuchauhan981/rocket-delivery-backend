import { Inject, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/core/constants/messages';

import { COUNTRIES_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Countries } from 'src/modules/countries/countries.entity';
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

      const countries = await this.countriesRepositories.findAndCountAll({
        where: { is_deleted: 0 },
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
