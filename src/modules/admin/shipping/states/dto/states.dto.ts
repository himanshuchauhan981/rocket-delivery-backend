import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class EditStateParams {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}

class EditStatePayload {
  @ApiProperty({ required: false })
  status: boolean;

  @ApiProperty({ required: false })
  active: number;
}

class NewState {
  @ApiProperty()
  @IsNotEmpty()
  country_id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

class StateList {
  @ApiProperty()
  @IsNotEmpty()
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  pageSize: number;

  @ApiProperty({ required: false })
  countryId: number;

  @ApiProperty({ required: false })
  active: number;

  @ApiProperty({ required: false })
  name: string;
}

export { EditStateParams, EditStatePayload, NewState, StateList };
