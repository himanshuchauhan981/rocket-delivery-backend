import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileListBySlug {
  @IsNotEmpty()
  @ApiProperty({ enum: ['product', 'category', 'sub_category'] })
  slug: string;

  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @ApiProperty({ required: false })
  name: string;
}

export class CreateFile {
  @IsNotEmpty()
  @ApiProperty({ enum: ['product', 'category', 'sub_category'] })
  slug: string;

  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  url: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class SpecificFile {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class FileList {
  @IsNotEmpty()
  @ApiProperty()
  pageIndex: number;

  @IsNotEmpty()
  @ApiProperty()
  pageSize: number;

  @IsNotEmpty()
  @ApiProperty()
  filterBy: string;

  @IsNotEmpty()
  @ApiProperty()
  sortBy: string;
}
