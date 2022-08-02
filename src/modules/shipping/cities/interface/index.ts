import { ApiProperty } from '@nestjs/swagger';

import { CountryListState } from '../../states/interface';

class City {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  is_active: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  state: CountryListState;
}

export { City };
