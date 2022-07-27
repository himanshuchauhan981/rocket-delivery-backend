import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { APIResponse } from 'src/modules/common/dto/common.dto';

class AdminLogin {
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

class AdminToken {
  @ApiProperty()
  token: string;
}

class AdminDetails {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}

class AdminLoginSuccessResponse extends APIResponse {
  @ApiProperty()
  data: AdminToken;
}

class AdminDetailsResponse extends APIResponse {
  @ApiProperty()
  data: { adminDetails: AdminDetails };
}

export { AdminLoginSuccessResponse, AdminLogin, AdminDetailsResponse };
