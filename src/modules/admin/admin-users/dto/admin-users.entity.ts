import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UsersList {
  @IsNotEmpty()
  @ApiProperty()
  pageIndex: number;

  @IsNotEmpty()
  @ApiProperty()
  pageSize: number;

  @ApiProperty({ required: false })
  search: string;

  @ApiProperty()
  @IsNotEmpty()
  sortColumn: string;

  @ApiProperty()
  @IsNotEmpty()
  sortBy: string;
}