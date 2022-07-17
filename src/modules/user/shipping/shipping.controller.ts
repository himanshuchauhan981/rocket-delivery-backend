import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { CitiesList } from 'src/modules/admin/shipping/cities/dto/cities.dto';
import { CountriesList } from 'src/modules/admin/shipping/countries/dto/countries.dto';
import { StateList } from 'src/modules/admin/shipping/states/dto/states.dto';
import { CitiesService } from 'src/modules/shipping/cities/cities.service';
import { CountriesService } from 'src/modules/shipping/countries/countries.service';
import { StatesService } from 'src/modules/shipping/states/states.service';

@Controller('user/shipping')
@ApiTags('User shipping')
export class UserShippingController {
  constructor(
    private readonly commonCountryService: CountriesService,
    private readonly commonStatesService: StatesService,
    private readonly commonCitiesService: CitiesService,
  ) {}

  @Get('countries/list')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async findAll(@Query(new ValidationPipe()) query: CountriesList) {
    return await this.commonCountryService.findAll(query);
  }

  @Get('states/list')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async stateList(@Query(new ValidationPipe()) query: StateList) {
    return await this.commonStatesService.findAll(query);
  }

  @Get('cities/list')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async citiesList(@Query(new ValidationPipe()) query: CitiesList) {
    return await this.commonCitiesService.findAll(query);
  }
}
