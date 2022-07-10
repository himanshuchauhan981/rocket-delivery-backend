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
import { AdminCountriesService } from './countries.service';
import { CountriesList } from './dto/countries.dto';

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
}
