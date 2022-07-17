import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UsersList {
  @IsNotEmpty()
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @ApiProperty()
  limit: number;

  @ApiProperty({ required: false })
  search: string;

  @ApiProperty()
  @IsNotEmpty()
  sort_column: string;

  @ApiProperty()
  @IsNotEmpty()
  sort_by: string;
}

export class UserIdParams {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}

export class UserDetailList {
  @IsNotEmpty()
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @ApiProperty()
  limit: number;
}

export class NewPassword {
  @IsNotEmpty()
  @ApiProperty()
  new_password: string;
}

export class UserStatus {
  @IsNotEmpty()
  @ApiProperty()
  is_active: number;
}
