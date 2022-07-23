import { ApiResponse } from 'src/modules/common/interface';
import { MeasuringUnit } from '.';

interface MeasuringUnitListInterface extends ApiResponse {
  data: {
    measuringUnitList: MeasuringUnit[];
  };
}

export { MeasuringUnitListInterface };
