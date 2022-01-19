import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AdminProductList {
  @ApiProperty()
  @IsNotEmpty()
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  pageSize: number;

  @ApiProperty()
  @IsNotEmpty()
  sort: number;

  @ApiProperty({ required: false })
  search: string;
}
