import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CountriesList {
  @ApiProperty()
  @IsNotEmpty()
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  pageSize: number;

  @ApiProperty({ required: false })
  search: string;
}

export class CountryId {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class CountryStatus {
  @IsNotEmpty()
  @ApiProperty({ enum: [0, 1] })
  @IsInt()
  status: number;
}
