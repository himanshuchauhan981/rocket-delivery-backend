import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';

import { MESSAGES } from 'src/core/constants/messages';
import {
  COUNTRIES_REPOSITORY,
  STATES_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Countries } from 'src/modules/shipping/countries.entity';
import { States } from 'src/modules/shipping/states.entity';
import { ApiResponse } from '../../dto/interface/admin';
import {
  EditStateParams,
  EditStatePayload,
  NewState,
  StateList,
} from './dto/states.dto';

@Injectable()
export class StatesService {
  constructor(
    @Inject(COUNTRIES_REPOSITORY)
    private readonly countriesRepository: typeof Countries,
    @Inject(STATES_REPOSITORY)
    private readonly statesRepository: typeof States,
  ) {}

  async create(payload: NewState): Promise<ApiResponse> {
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

  async findAll(payload: StateList) {
    try {
      const page = payload.pageIndex * payload.pageSize;

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
        limit: payload.pageSize,
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

  async updateState(
    params: EditStateParams,
    payload: EditStatePayload,
  ): Promise<ApiResponse> {
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
