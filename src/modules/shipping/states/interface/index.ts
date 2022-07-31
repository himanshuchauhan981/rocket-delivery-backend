import { ApiProperty } from '@nestjs/swagger';

import { StateListCountry } from '../../countries/interface';

class State {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  is_active: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  country: StateListCountry;
}

class CountryListState {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  country: StateListCountry;
}

export { State, CountryListState };
