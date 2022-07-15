import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ApiResponse } from '../dto/interface/admin';
import { AdminCountriesService } from './countries.service';
import {
  CountriesList,
  CountryId,
  CountryStatus,
  EditCountry,
  EditStateParams,
  EditStatePayload,
  NewState,
  StateList,
} from './dto/countries.dto';

@Controller('admin/countries')
@ApiTags('Admin Countries')
export class AdminCountriesController {
  constructor(private readonly adminCountriesService: AdminCountriesService) {}

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async findAll(@Query(new ValidationPipe()) query: CountriesList) {
    return await this.adminCountriesService.findAll(query);
  }

  @Put(':id/status')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async changeStatus(
    @Param() params: CountryId,
    @Body(new ValidationPipe()) payload: CountryStatus,
  ): Promise<ApiResponse> {
    return await this.adminCountriesService.statusUpdate(
      params.id,
      payload.status,
    );
  }

  @Put(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async delete(
    @Param(new ValidationPipe()) params: CountryId,
    @Body(new ValidationPipe()) payload: EditCountry,
  ): Promise<ApiResponse> {
    return await this.adminCountriesService.update(params.id, payload);
  }

  @Post('state/new')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async addNewState(@Body(new ValidationPipe()) payload: NewState) {
    return await this.adminCountriesService.addNewState(payload);
  }

  @Get('states/list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async stateList(@Query(new ValidationPipe()) query: StateList) {
    return await this.adminCountriesService.getStateList(query);
  }

  @Put('state/:state')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async updateState(
    @Param(new ValidationPipe()) params: EditStateParams,
    @Body(new ValidationPipe()) payload: EditStatePayload,
  ) {
    return await this.adminCountriesService.updateState(params, payload);
  }
}
