import { ApiProperty } from '@nestjs/swagger';
import { APIResponse } from 'src/modules/common/dto/common.dto';

class ForgetPassword {
  @ApiProperty()
  otpValidity: string;

  @ApiProperty()
  id: number;
}

class ForgetPasswordResponse extends APIResponse {
  @ApiProperty()
  data: ForgetPassword;
}

export { ForgetPasswordResponse };
