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
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  pageSize: number;

  @ApiProperty()
  @IsNotEmpty()
  state_id: number;
}

class EditCitiesPayload {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  status: boolean;

  @ApiProperty({ required: false })
  active: number;
}

class EditCitiesParams {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

export { NewCity, CitiesList, EditCitiesPayload, EditCitiesParams };
