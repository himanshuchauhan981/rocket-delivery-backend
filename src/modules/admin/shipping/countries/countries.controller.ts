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
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { CountriesListResponse } from './dto/countries-response.dto';
import { USER_TYPE } from 'src/core/constants/constants';

@Controller('admin/shipping/countries')
@ApiTags('Admin Shipping countries')
export class CountriesController {
  constructor(
    private readonly countryService: CountriesService,
    private readonly commonCountryService: CommonCountriesService,
  ) {}

  @Get('list')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: CountriesListResponse })
  findAll(
    @Query(new ValidationPipe()) query: CountriesList,
  ): Promise<CountriesListResponse> {
    return this.commonCountryService.findAll(query);
  }

  @Put(':id/status')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse })
  @ApiNotFoundResponse({ type: APIResponse, description: 'Invalid country ID' })
  changeStatus(
    @Param() params: CountryId,
    @Body(new ValidationPipe()) payload: CountryStatus,
  ): Promise<APIResponse> {
    return this.countryService.statusUpdate(params.id, payload.status);
  }

  @Put(':id')
  @Auth(USER_TYPE.ADMIN)
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse })
  @ApiNotFoundResponse({ type: APIResponse, description: 'Invalid country ID' })
  delete(
    @Param(new ValidationPipe()) params: CountryId,
    @Body(new ValidationPipe()) payload: EditCountry,
  ): Promise<ApiResponse> {
    return this.countryService.update(params.id, payload);
  }
}
