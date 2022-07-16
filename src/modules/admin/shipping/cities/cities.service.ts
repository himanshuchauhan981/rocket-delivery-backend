import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { MESSAGES } from 'src/core/constants/messages';
import {
  CITIES_REPOSITORY,
  COUNTRIES_REPOSITORY,
  STATES_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Cities } from 'src/modules/shipping/cities.entity';
import { Countries } from 'src/modules/shipping/countries.entity';
import { States } from 'src/modules/shipping/states.entity';
import { ApiResponse } from '../../dto/interface/admin';
import {
  CitiesList,
  CityId,
  EditCitiesPayload,
  NewCity,
} from './dto/cities.dto';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(CITIES_REPOSITORY)
    private readonly citiesRepository: typeof Cities,
    @Inject(COUNTRIES_REPOSITORY)
    private readonly countriesRepository: typeof Countries,
    @Inject(STATES_REPOSITORY)
    private readonly statesRepository: typeof Countries,
  ) {}

  async create(payload: NewCity): Promise<ApiResponse> {
    try {
      const existingState = await this.statesRepository.findByPk(
        payload.state_id,
      );

      if (!existingState) {
        throw new HttpException(
          MESSAGES.STATE_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      await this.citiesRepository.create<any>({
        state_id: payload.state_id,
        name: payload.name,
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.STATE_ADDED_SUCCESSFULL,
      };
    } catch (err) {
      throw err;
    }
  }

  async list(payload: CitiesList) {
    try {
      const page = payload.pageIndex * payload.pageSize;

      const query: any = [{ is_deleted: 0 }];

      if (payload.state_id) {
        const existingState = this.statesRepository.findByPk(payload.state_id);

        if (!existingState) {
          throw new HttpException(
            MESSAGES.STATE_NOT_FOUND,
            STATUS_CODE.NOT_FOUND,
          );
        }

        query.push({ state_id: payload.state_id });
      }

      const cities = await this.citiesRepository.findAndCountAll({
        where: {
          [sequelize.Op.and]: query,
        },
        offset: page,
        limit: payload.pageSize,
        include: [{ model: States, attributes: ['id', 'name'] }],
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

  async update(
    params: CityId,
    payload: EditCitiesPayload,
  ): Promise<ApiResponse> {
    try {
      const updatePayload: any = {};

      if (payload.name) {
        updatePayload.name = payload.name;
      } else if (payload.active !== null) {
        updatePayload.is_active = payload.active;
      }

      const [updateStatus] = await this.citiesRepository.update(updatePayload, {
        where: { id: params.id },
      });

      if (!updateStatus) {
        throw new HttpException(MESSAGES.CITY_NOT_FOUND, STATUS_CODE.NOT_FOUND);
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.CITY_UPDATED_SUCCESSFULL,
      };
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number) {
    try {
      const [updateStatus] = await this.citiesRepository.update(
        { is_deleted: 1 },
        { where: { id } },
      );

      if (!updateStatus) {
        throw new HttpException(MESSAGES.CITY_NOT_FOUND, STATUS_CODE.NOT_FOUND);
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.CITY_UPDATED_SUCCESSFULL,
      };
    } catch (err) {
      throw err;
    }
  }
}
