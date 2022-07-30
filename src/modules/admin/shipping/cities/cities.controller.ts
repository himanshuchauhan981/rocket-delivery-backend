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
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  addNewState(@Body(new ValidationPipe()) payload: NewCity) {
    return this.citiesService.create(payload);
  }

  @Get('list')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  citiesList(@Query(new ValidationPipe()) query: CitiesList) {
    return this.commonCitiesService.findAll(query);
  }

  @Put(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  updateState(
    @Param(new ValidationPipe()) params: CityId,
    @Body(new ValidationPipe()) payload: EditCitiesPayload,
  ) {
    return this.citiesService.update(params, payload);
  }

  @Delete(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  delete(@Param(new ValidationPipe()) params: CityId) {
    return this.citiesService.delete(params.id);
  }
}
