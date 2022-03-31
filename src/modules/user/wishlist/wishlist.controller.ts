import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/core/decorators/auth.decorator';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { WishlistService } from 'src/modules/wishlist/wishlist.service';
import { NewWishlistItem, SpecificWishlistItem } from './entity/wishlist.dto';

@Controller('user/wishlist')
@ApiTags('wishlist')
export class UserWishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get('all')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async findAll(@Req() req) {
    return await this.wishlistService.findAll(req.userId);
  }

  @Post('new')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async create(
    @Body(new ValidationPipe()) payload: NewWishlistItem,
    @Req() req,
  ) {
    const data = await this.wishlistService.create(payload, req.userId);
    console.log(data);
    return data;
  }

  @Delete(':id')
  @Auth('user')
  @UseInterceptors(TransformInterceptor)
  async delete(@Param(new ValidationPipe()) payload: SpecificWishlistItem) {
    return await this.wishlistService.delete(payload.id);
  }
}
