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

import { Auth } from '../../../core/decorators/auth.decorator';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { WishlistService } from './wishlist.service';
import { NewWishlistItem, SpecificWishlistItem } from './entity/wishlist.dto';

@Controller('user/wishlist')
@ApiTags('wishlist')
export class UserWishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get('list')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  findAll(@Req() req) {
    return this.wishlistService.findAll(req.userId);
  }

  @Post('new')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  create(@Body(new ValidationPipe()) payload: NewWishlistItem, @Req() req) {
    return this.wishlistService.create(payload, req.userId);
  }

  @Delete(':id')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  delete(@Param(new ValidationPipe()) payload: SpecificWishlistItem) {
    return this.wishlistService.delete(payload.id);
  }

  @Get(':id')
  @Auth('USER')
  @UseInterceptors(TransformInterceptor)
  getSpecificWishlist(
    @Param(new ValidationPipe()) payload: SpecificWishlistItem,
    @Req() request,
  ) {
    return this.wishlistService.findOne(payload.id, request.userId);
  }
}
