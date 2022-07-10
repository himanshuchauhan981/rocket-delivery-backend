import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CountriesList {
  @ApiProperty()
  @IsNotEmpty()
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  pageSize: number;
}
