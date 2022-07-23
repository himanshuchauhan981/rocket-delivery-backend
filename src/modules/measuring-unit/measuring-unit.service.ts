import { Injectable } from '@nestjs/common';

import { STATUS_CODE } from '../../core/constants/status_code';
import { MESSAGES } from '../../core/constants/messages';
import { MeasuringUnit } from './measuring-unit.entity';
import { MeasuringUnitListInterface } from './interface/response.interface';

@Injectable()
export class MeasuringUnitService {
  async findAll(): Promise<MeasuringUnitListInterface> {
    try {
      const measuringUnitList = await MeasuringUnit.findAll({
        where: { is_deleted: 0 },
        attributes: ['id', 'measuring_type', 'symbol'],
      });
      return {
        statusCode: STATUS_CODE.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: { measuringUnitList },
      };
    } catch (err) {
      throw err;
    }
  }
}
