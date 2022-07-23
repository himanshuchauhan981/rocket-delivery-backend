import { ApiResponse } from 'src/modules/common/interface';
import { State } from '.';

interface StatesListResponse extends ApiResponse {
  data: {
    states: State[];
    count: number;
  };
}

export { StatesListResponse };
