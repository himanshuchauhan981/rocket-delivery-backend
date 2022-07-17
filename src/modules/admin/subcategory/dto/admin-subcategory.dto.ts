import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SubCategoryList {
  @IsNotEmpty()
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @ApiProperty()
  limit: number;

  @IsNotEmpty()
  @ApiProperty()
  category_id: number;
}

export class SubmitSubCategory {
  @IsNotEmpty()
  @ApiProperty()
  image_id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class SubCategoryId {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}
