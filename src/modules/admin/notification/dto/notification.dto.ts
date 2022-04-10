import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NotficationList {
  @ApiProperty()
  @IsNotEmpty()
  pageSize: number;
}
