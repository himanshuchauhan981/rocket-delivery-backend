import { Controller, Get, Param, Query, Req, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/core/decorators/auth.decorator';

import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { ProductService } from 'src/modules/product/product.service';
import { UserProducts,SpecificProduct } from '../dto/user.dto';

@Controller('user/product')
@ApiTags('User products')
export class UserProductController {

	constructor(private readonly productService: ProductService) {}

	@Get('list')
	@UseInterceptors(TransformInterceptor)
	async productList(@Query(new ValidationPipe()) query: UserProducts) {
		return this.productService.list(query.category_id, query.sub_category_id);
	}

	@Get('offers')
	@Auth('user')
	@UseInterceptors(TransformInterceptor)
	async productOffers(@Req()request) {
		return this.productService.productOffers(request.userId);
	}

	@Get(':id')
	@UseInterceptors(TransformInterceptor)
	async findOneById(@Param(new ValidationPipe()) params: SpecificProduct) {
		return this.productService.findOneById(params.id);
	}
}
