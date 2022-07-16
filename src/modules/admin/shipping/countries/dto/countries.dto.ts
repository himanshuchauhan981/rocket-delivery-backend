import { IsNotEmpty, IsInt } from 'class-validator';
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

  @ApiProperty({ required: false })
  isActive: number;
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

class EditCountry {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  status: string;
}

export { CountriesList, CountryId, CountryStatus, EditCountry };
