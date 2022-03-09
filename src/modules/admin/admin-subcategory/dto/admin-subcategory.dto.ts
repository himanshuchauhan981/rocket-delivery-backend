import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SubCategoryList {
  @IsNotEmpty()
  @ApiProperty()
  pageIndex: number;

  @IsNotEmpty()
  @ApiProperty()
  pageSize: number;

  @IsNotEmpty()
  @ApiProperty()
  categoryId: number;
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
