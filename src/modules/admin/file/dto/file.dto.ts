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

  @IsNotEmpty()
  @ApiProperty()
  extension: string;

  @IsNotEmpty()
  @ApiProperty()
  size: number;
}

export class SpecificFile {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class FileList {
  @IsNotEmpty()
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @ApiProperty()
  limit: number;

  @IsNotEmpty()
  @ApiProperty()
  filter_by: string;

  @IsNotEmpty()
  @ApiProperty()
  sort_by: string;
}
