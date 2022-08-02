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
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
import { APIResponse } from 'src/modules/common/dto/common.dto';
import { CitiesListResponse } from 'src/modules/shipping/cities/interface/response.interface';

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
  @ApiOkResponse({ type: APIResponse })
  @ApiNotFoundResponse({ type: APIResponse, description: 'Invalid State ID' })
  addNewState(
    @Body(new ValidationPipe()) payload: NewCity,
  ): Promise<APIResponse> {
    return this.citiesService.create(payload);
  }

  @Get('list')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: CitiesListResponse })
  citiesList(
    @Query(new ValidationPipe()) query: CitiesList,
  ): Promise<CitiesListResponse> {
    return this.commonCitiesService.findAll(query);
  }

  @Put(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse })
  @ApiNotFoundResponse({ type: APIResponse, description: 'Invalid City ID' })
  updateState(
    @Param(new ValidationPipe()) params: CityId,
    @Body(new ValidationPipe()) payload: EditCitiesPayload,
  ): Promise<APIResponse> {
    return this.citiesService.update(params, payload);
  }

  @Delete(':id')
  @Auth('ADMIN')
  @UseInterceptors(TransformInterceptor)
  @ApiOkResponse({ type: APIResponse })
  @ApiNotFoundResponse({ type: APIResponse, description: 'Invalid City ID' })
  delete(@Param(new ValidationPipe()) params: CityId): Promise<APIResponse> {
    return this.citiesService.delete(params.id);
  }
}
