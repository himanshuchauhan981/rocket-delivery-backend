import {
  Body,
  Controller,
  Post,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { PaymentService } from 'src/modules/payment/payment.service';
import { NewPaymentOrder } from './dto/payment.dto';

@Controller('user/payment')
@ApiTags('User payments')
export class UserPaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async generateRazorpayOrder(
    @Body(new ValidationPipe()) payload: NewPaymentOrder,
    @Req() request,
  ) {
    return this.paymentService.generateRazorpayOrder(
      payload.amount,
      request.userId,
    );
  }
}
