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
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { StatesListResponse } from './dto/states-response.dto';

@Controller('admin/shipping/states')
@ApiTags('Admin Shipping States')
export class StatesController {
  constructor(
    private readonly statesService: StatesService,
    private readonly commonStatesService: CommonStatesService,
  ) {}

  @Post('new')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse })
  @ApiNotFoundResponse({ type: APIResponse, description: 'Invalid state ID' })
  addNewState(
    @Body(new ValidationPipe()) payload: NewState,
  ): Promise<APIResponse> {
    return this.statesService.create(payload);
  }

  @Get('list')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: StatesListResponse })
  stateList(
    @Query(new ValidationPipe()) query: StateList,
  ): Promise<StatesListResponse> {
    return this.commonStatesService.findAll(query);
  }

  @Put(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse })
  @ApiNotFoundResponse({ type: APIResponse, description: 'Invalid state ID' })
  updateState(
    @Param(new ValidationPipe()) params: EditStateParams,
    @Body(new ValidationPipe()) payload: EditStatePayload,
  ) {
    return this.statesService.updateState(params, payload);
  }
}
