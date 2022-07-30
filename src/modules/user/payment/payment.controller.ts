import {
  Body,
  Controller,
  Post,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { PaymentService } from './payment.service';
import { NewPaymentOrder } from './dto/payment.dto';

@Controller('user/payment')
@ApiTags('User payments')
export class UserPaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  generateRazorpayOrder(
    @Body(new ValidationPipe()) payload: NewPaymentOrder,
    @Req() request,
  ) {
    return this.paymentService.generateRazorpayOrder(
      payload.amount,
      request.userId,
    );
  }
}
