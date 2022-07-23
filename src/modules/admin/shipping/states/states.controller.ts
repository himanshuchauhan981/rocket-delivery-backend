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
import { StatesService as CommonStatesService } from '../../../shipping/states/states.service';

@Controller('admin/shipping/states')
@ApiTags('Admin Shipping States')
export class StatesController {
  constructor(
    private readonly statesService: StatesService,
    private readonly commonStatesService: CommonStatesService,
  ) {}

  @Post('new')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  addNewState(@Body(new ValidationPipe()) payload: NewState) {
    return this.statesService.create(payload);
  }

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  stateList(@Query(new ValidationPipe()) query: StateList) {
    return this.commonStatesService.findAll(query);
  }

  @Put(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  updateState(
    @Param(new ValidationPipe()) params: EditStateParams,
    @Body(new ValidationPipe()) payload: EditStatePayload,
  ) {
    return this.statesService.updateState(params, payload);
  }
}
