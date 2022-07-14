import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/core/constants/messages';
import sequelize from 'sequelize';

import {
  COUNTRIES_REPOSITORY,
  STATES_REPOSITORY,
} from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { Countries } from 'src/modules/shipping/countries.entity';
import { ApiResponse } from '../dto/interface/admin';
import {
  CountriesList,
  EditCountry,
  NewState,
  StateList,
} from './dto/countries.dto';
import { States } from 'src/modules/shipping/states.entity';

@Injectable()
export class AdminCountriesService {
  constructor(
    @Inject(COUNTRIES_REPOSITORY)
    private readonly countriesRepository: typeof Countries,
    @Inject(STATES_REPOSITORY)
    private readonly statesRepository: typeof States,
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
      } else if (payload.name) {
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
        message: MESSAGES.COUNTRY_DELETE_SUCCESSFULL,
      };
    } catch (err) {
      throw err;
    }
  }

  async addNewState(payload: NewState): Promise<ApiResponse> {
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

  async getStateList(payload: StateList) {
    try {
      const page = payload.pageIndex * payload.pageSize;

      const query: any = [{ is_active: 1, is_deleted: 0 }];

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

      const states = await this.statesRepository.findAndCountAll({
        where: { is_active: 1, is_deleted: 0 },
        offset: page,
        limit: payload.pageSize,
        include: [{ model: Countries, attributes: ['id', 'name'] }],
        attributes: ['id', 'name', 'is_active'],
      });

      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: STATUS_CODE.SUCCESS,
        data: { states: states.rows, count: states.count },
      };
    } catch (err) {
      throw err;
    }
  }
}
