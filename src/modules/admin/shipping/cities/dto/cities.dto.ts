import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class NewCity {
  @ApiProperty()
  @IsNotEmpty()
  state_id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: number;
}

class CitiesList {
  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNotEmpty()
  limit: number;

  @ApiProperty({ required: false })
  stateId: number;

  @ApiProperty({ required: false })
  active: number;

  @ApiProperty({ required: false })
  name: string;
}

class EditCitiesPayload {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  active: number;
}

class CityId {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export { NewCity, CitiesList, EditCitiesPayload, CityId };
