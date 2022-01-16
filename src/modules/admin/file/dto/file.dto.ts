import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileList {
  @IsNotEmpty()
  @ApiProperty({ enum: ['product', 'category', 'sub_category'] })
  slug: string;

  @IsNotEmpty()
  @ApiProperty()
  type: string;
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
