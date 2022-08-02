import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class UserEmail {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}

class VerifyPassword {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  otp: string;
}

class ResetPassword {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  new_password: string;
}

export { UserEmail, VerifyPassword, ResetPassword };
