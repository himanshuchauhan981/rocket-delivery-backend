import { ApiResponse } from 'src/modules/common/interface';
import { City } from '.';

interface CitiesListResponse extends ApiResponse {
  data: {
    cities: City[];
    count: number;
  };
}

export { CitiesListResponse };
