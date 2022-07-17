import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { MESSAGES } from 'src/core/constants/messages';
import {
  CITIES_REPOSITORY,
  STATES_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { CitiesList } from 'src/modules/admin/shipping/cities/dto/cities.dto';
import { Countries } from '../countries/countries.entity';
import { States } from '../states/states.entity';
import { Cities } from './cities.entity';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(CITIES_REPOSITORY)
    private readonly citiesRepository: typeof Cities,
    @Inject(STATES_REPOSITORY)
    private readonly statesRepository: typeof Countries,
  ) {}

  async findAll(payload: CitiesList) {
    try {
      const page = payload.page * payload.limit;

      const query: any = [{ is_deleted: 0 }];

      if (payload.stateId) {
        const existingState = this.statesRepository.findByPk(payload.stateId);

        if (!existingState) {
          throw new HttpException(
            MESSAGES.STATE_NOT_FOUND,
            STATUS_CODE.NOT_FOUND,
          );
        }

        query.push({ state_id: payload.stateId });
      }

      if (payload.name) {
        query.push({
          name: { [sequelize.Op.iLike]: `%${payload.name}%` },
        });
      }

      if (payload.active) {
        query.push({
          is_active: payload.active,
        });
      }

      console.log(query);

      const cities = await this.citiesRepository.findAndCountAll({
        where: {
          [sequelize.Op.and]: query,
        },
        offset: page,
        limit: payload.limit,
        include: [
          {
            model: States,
            attributes: ['id', 'name'],
            include: [{ model: Countries, attributes: ['id', 'name'] }],
          },
        ],
        attributes: ['id', 'name', 'is_active', 'created_at'],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { cities: cities.rows, count: cities.count },
      };
    } catch (err) {
      throw err;
    }
  }
}
