import { Injectable } from '@nestjs/common';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { MESSAGES } from 'src/core/constants/messages';
import { MeasuringUnit } from './measuring-unit.entity';

@Injectable()
export class MeasuringUnitService {
  async findAll() {
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
