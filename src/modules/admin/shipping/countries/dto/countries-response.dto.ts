import { ApiProperty } from '@nestjs/swagger';

import { APIResponse } from 'src/modules/common/dto/common.dto';

class Country {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  iso_code: string;

  @ApiProperty()
  is_active: number;
}

class CountriesList {
  @ApiProperty({ type: () => [Country] })
  countries: Country[];

  @ApiProperty()
  count: number;
}

class CountriesListResponse extends APIResponse {
  @ApiProperty()
  data: CountriesList;
}

export { CountriesListResponse };
