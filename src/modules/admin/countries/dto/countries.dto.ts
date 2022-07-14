import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CountriesList {
  @ApiProperty()
  @IsNotEmpty()
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  pageSize: number;

  @ApiProperty({ required: false })
  search: string;
}

class CountryId {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

class CountryStatus {
  @IsNotEmpty()
  @ApiProperty({ enum: [0, 1] })
  @IsInt()
  status: number;
}

class NewState {
  @ApiProperty()
  @IsNotEmpty()
  country_id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: number;
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
}

class EditCountry {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  status: string;
}

export {
  StateList,
  NewState,
  CountryStatus,
  CountryId,
  CountriesList,
  EditCountry,
};
