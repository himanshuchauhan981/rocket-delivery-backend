import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrdersList {
  @IsNotEmpty()
  @ApiProperty()
  pageIndex: number;

  @IsNotEmpty()
  @ApiProperty()
  pageSize: number;
}
