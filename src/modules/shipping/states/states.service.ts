import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { MESSAGES } from 'src/core/constants/messages';
import {
  COUNTRIES_REPOSITORY,
  STATES_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { StateList } from 'src/modules/admin/shipping/states/dto/states.dto';
import { Countries } from '../countries/countries.entity';
import { StatesListResponse } from './interface/response.interface';
import { States } from './states.entity';

@Injectable()
export class StatesService {
  constructor(
    @Inject(COUNTRIES_REPOSITORY)
    private readonly countriesRepository: typeof Countries,
    @Inject(STATES_REPOSITORY)
    private readonly statesRepository: typeof States,
  ) {}

  async findAll(payload: StateList): Promise<StatesListResponse> {
    try {
      const page = payload.page * payload.limit;

      const query: any = [{ is_deleted: 0 }];

      if (payload.countryId) {
        const existingCountry = this.countriesRepository.findByPk(
          payload.countryId,
        );

        if (!existingCountry) {
          throw new HttpException(
            MESSAGES.COUNTRY_NOT_FOUND,
            STATUS_CODE.NOT_FOUND,
          );
        }

        query.push({ country_id: payload.countryId });
      }

      if (payload.active) {
        query.push({ is_active: payload.active });
      }

      if (payload.name) {
        query.push({ name: { [sequelize.Op.iLike]: `%${payload.name}%` } });
      }

      const states = await this.statesRepository.findAndCountAll({
        where: query,
        offset: page,
        limit: payload.limit,
        include: [{ model: Countries, attributes: ['id', 'name'] }],
        attributes: ['id', 'name', 'is_active', 'created_at'],
        order: [['name', 'ASC']],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { states: states.rows, count: states.count },
      };
    } catch (err) {
      throw err;
    }
  }
}
