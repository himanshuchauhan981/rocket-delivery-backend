import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NotficationList {
  @ApiProperty()
  @IsNotEmpty()
  pageSize: number;
}

export class UpdateNotificationStatus {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  all_read: boolean;
}
