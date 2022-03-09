import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

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
  @ApiProperty({ enum: [0, 1] })
  @IsInt()
  status: number;
}

export class CategoryId {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class CategoryIdList {
  @IsNotEmpty()
  @ApiProperty()
  categoryIds: number[];
}

export class SubmitCategory {
  @IsNotEmpty()
  @ApiProperty()
  image_id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
