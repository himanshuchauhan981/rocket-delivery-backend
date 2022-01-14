import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryList {
  @IsNotEmpty()
  @ApiProperty()
  pageIndex: number;

  @IsNotEmpty()
  @ApiProperty()
  pageSize: number;
}

export class CategoryStatus {
  @IsNotEmpty()
  @ApiProperty()
  status: number;
}

export class CategoryId {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}
