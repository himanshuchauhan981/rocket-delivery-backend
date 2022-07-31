import { HttpException, Inject, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/core/constants/messages';
import {
  CITIES_REPOSITORY,
  STATES_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { Cities } from 'src/modules/shipping/cities/cities.entity';
import { Countries } from 'src/modules/shipping/countries/countries.entity';
import { CityId, EditCitiesPayload, NewCity } from './dto/cities.dto';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(CITIES_REPOSITORY)
    private readonly citiesRepository: typeof Cities,
    @Inject(STATES_REPOSITORY)
    private readonly statesRepository: typeof Countries,
  ) {}

  async create(payload: NewCity): Promise<APIResponse> {
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

  async update(
    params: CityId,
    payload: EditCitiesPayload,
  ): Promise<APIResponse> {
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

  async delete(id: number): Promise<APIResponse> {
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
