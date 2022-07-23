import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Body,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { CountriesService } from './countries.service';
import { CountriesService as CommonCountriesService } from '../../../shipping/countries/countries.service';
import {
  CountriesList,
  CountryId,
  CountryStatus,
  EditCountry,
} from './dto/countries.dto';
import { ApiResponse } from 'src/modules/common/interface';

@Controller('admin/shipping/countries')
@ApiTags('Admin Shipping countries')
export class CountriesController {
  constructor(
    private readonly countryService: CountriesService,
    private readonly commonCountryService: CommonCountriesService,
  ) {}

  @Get('list')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async findAll(@Query(new ValidationPipe()) query: CountriesList) {
    return await this.commonCountryService.findAll(query);
  }

  @Put(':id/status')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async changeStatus(
    @Param() params: CountryId,
    @Body(new ValidationPipe()) payload: CountryStatus,
  ): Promise<ApiResponse> {
    return await this.countryService.statusUpdate(params.id, payload.status);
  }

  @Put(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async delete(
    @Param(new ValidationPipe()) params: CountryId,
    @Body(new ValidationPipe()) payload: EditCountry,
  ): Promise<ApiResponse> {
    return await this.countryService.update(params.id, payload);
  }
}
