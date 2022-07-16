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
import { CitiesService } from './cities.service';
import {
  CitiesList,
  EditCitiesParams,
  EditCitiesPayload,
  NewCity,
} from './dto/cities.dto';

@Controller('admin/shipping/cities')
@ApiTags('Admin Shipping Cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post('new')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async addNewState(@Body(new ValidationPipe()) payload: NewCity) {
    return await this.citiesService.create(payload);
  }

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async stateList(@Query(new ValidationPipe()) query: CitiesList) {
    return await this.citiesService.list(query);
  }

  @Put(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async updateState(
    @Param(new ValidationPipe()) params: EditCitiesParams,
    @Body(new ValidationPipe()) payload: EditCitiesPayload,
  ) {
    return await this.citiesService.update(params, payload);
  }
}
