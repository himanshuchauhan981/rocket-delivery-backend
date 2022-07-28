import { ApiProperty } from '@nestjs/swagger';

export class JWTPayload {
  id: number;
  role: string;
  email: string;
}

export class APIResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
