import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import {
  EditStateParams,
  EditStatePayload,
  NewState,
  StateList,
} from './dto/states.dto';
import { StatesService } from './states.service';

@Controller('admin/shipping/states')
@ApiTags('Admin Shipping States')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post('new')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async addNewState(@Body(new ValidationPipe()) payload: NewState) {
    return await this.statesService.create(payload);
  }

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async stateList(@Query(new ValidationPipe()) query: StateList) {
    return await this.statesService.findAll(query);
  }

  @Put(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async updateState(
    @Param(new ValidationPipe()) params: EditStateParams,
    @Body(new ValidationPipe()) payload: EditStatePayload,
  ) {
    return await this.statesService.updateState(params, payload);
  }
}
