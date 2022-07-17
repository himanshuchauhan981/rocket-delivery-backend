import {
  Body,
  Controller,
  Delete,
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
import { CitiesService } from './cities.service';
import { CitiesService as CommonCitiesService } from '../../../shipping/cities/cities.service';
import {
  CitiesList,
  CityId,
  EditCitiesPayload,
  NewCity,
} from './dto/cities.dto';

@Controller('admin/shipping/cities')
@ApiTags('Admin Shipping Cities')
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly commonCitiesService: CommonCitiesService,
  ) {}

  @Post('new')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async addNewState(@Body(new ValidationPipe()) payload: NewCity) {
    return await this.citiesService.create(payload);
  }

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async citiesList(@Query(new ValidationPipe()) query: CitiesList) {
    return await this.commonCitiesService.findAll(query);
  }

  @Put(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async updateState(
    @Param(new ValidationPipe()) params: CityId,
    @Body(new ValidationPipe()) payload: EditCitiesPayload,
  ) {
    return await this.citiesService.update(params, payload);
  }

  @Delete(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async delete(@Param(new ValidationPipe()) params: CityId) {
    return await this.citiesService.delete(params.id);
  }
}
