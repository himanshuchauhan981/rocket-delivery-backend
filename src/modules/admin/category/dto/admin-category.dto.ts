import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CategoryList {
  @IsNotEmpty()
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @ApiProperty()
  limit: number;

  @ApiProperty()
  @IsNotEmpty()
  sort_column: string;

  @ApiProperty()
  @IsNotEmpty()
  sort_by: string;
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
  @ApiProperty({ type: () => [Number] })
  category_ids: number[];
}

export class SubmitCategory {
  @IsNotEmpty()
  @ApiProperty()
  image_id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
