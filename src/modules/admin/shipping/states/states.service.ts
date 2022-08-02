import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { MESSAGES } from 'src/core/constants/messages';
import {
  COUNTRIES_REPOSITORY,
  STATES_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { Countries } from 'src/modules/shipping/countries/countries.entity';
import { States } from 'src/modules/shipping/states/states.entity';
import { EditStateParams, EditStatePayload, NewState } from './dto/states.dto';

@Injectable()
export class StatesService {
  constructor(
    @Inject(COUNTRIES_REPOSITORY)
    private readonly countriesRepository: typeof Countries,
    @Inject(STATES_REPOSITORY)
    private readonly statesRepository: typeof States,
  ) {}

  async create(payload: NewState): Promise<APIResponse> {
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

      const existingState = await this.statesRepository.findOne({
        where: {
          [sequelize.Op.and]: [{ name: payload.name }, { is_deleted: 0 }],
        },
      });

      if (existingState) {
        throw new HttpException(MESSAGES.STATE_EXISTED, STATUS_CODE.CONFLICT);
      }

      await this.statesRepository.create<any>({
        country_id: payload.country_id,
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

  async updateState(
    params: EditStateParams,
    payload: EditStatePayload,
  ): Promise<APIResponse> {
    try {
      const updatePayload: any = {};

      if (payload.status) {
        updatePayload.is_deleted = 1;
      } else if (payload.active !== null) {
        updatePayload.is_active = payload.active;
      }

      const [updateStatus] = await this.statesRepository.update(updatePayload, {
        where: { id: params.id },
      });

      if (!updateStatus) {
        throw new HttpException(
          MESSAGES.STATE_NOT_FOUND,
          STATUS_CODE.NOT_FOUND,
        );
      }

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.STATE_UPDATED_SUCCESSFULL,
      };
    } catch (err) {
      throw err;
    }
  }
}
