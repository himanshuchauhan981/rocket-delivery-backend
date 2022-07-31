import { ApiProperty } from '@nestjs/swagger';

import { APIResponse } from 'src/modules/common/dto/common.dto';

class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  mobile_number: string;

  @ApiProperty()
  is_active: number;

  @ApiProperty()
  profile_image: string;
}

class ListUsers {
  @ApiProperty({ type: () => [User] })
  userList: User[];

  @ApiProperty()
  count: number;
}

class ListUsersResponse extends APIResponse {
  @ApiProperty()
  data: ListUsers;
}

class DownloadUserCSVResponse {
  @ApiProperty()
  data: { csv: string };

  @ApiProperty()
  responseType: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

export { ListUsersResponse, DownloadUserCSVResponse };
