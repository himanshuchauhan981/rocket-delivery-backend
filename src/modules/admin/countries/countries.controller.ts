import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ApiResponse } from '../dto/interface/admin';
import { AdminCountriesService } from './countries.service';
import { CountriesList, CountryId, CountryStatus } from './dto/countries.dto';

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

  @Delete(':id')
  @Auth('admin')
  @UseInterceptors(TransformInterceptor)
  async delete(
    @Param(new ValidationPipe()) params: CountryId,
  ): Promise<ApiResponse> {
    return await this.adminCountriesService.delete(params.id);
  }
}
