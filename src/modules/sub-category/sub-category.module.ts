import { Module } from '@nestjs/common';

import { SubCategoryProvider } from './sub-category.provider';
import { SubCategoryService } from './sub-category.service';

@Module({ providers: [...SubCategoryProvider, SubCategoryService] })
export class SubCategoryModule {}
