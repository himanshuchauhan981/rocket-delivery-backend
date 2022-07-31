import { HttpException, Inject, Injectable } from '@nestjs/common';

import { MESSAGES } from 'src/core/constants/messages';
import { COUNTRIES_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { Countries } from 'src/modules/shipping/countries/countries.entity';
import { EditCountry } from './dto/countries.dto';

@Injectable()
export class CountriesService {
  constructor(
    @Inject(COUNTRIES_REPOSITORY)
    private readonly countriesRepository: typeof Countries,
  ) {}

  async statusUpdate(country_id: number, status: number): Promise<APIResponse> {
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

  async update(id: number, payload: EditCountry): Promise<APIResponse> {
    try {
      const updatePayload: any = {};

      if (payload.name) {
        updatePayload.name = payload.name;
      } else if (payload.status) {
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
        message: MESSAGES.COUNTRY_UPDATE_SUCCESSFULL,
      };
    } catch (err) {
      throw err;
    }
  }
}
