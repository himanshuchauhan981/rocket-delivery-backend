import { ApiProperty } from '@nestjs/swagger';
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { City } from '.';

class CitiesList {
  @ApiProperty({ type: () => [City] })
  cities: City[];

  @ApiProperty()
  count: number;
}

class CitiesListResponse extends APIResponse {
  @ApiProperty()
  data: CitiesList;
}

export { CitiesListResponse };
