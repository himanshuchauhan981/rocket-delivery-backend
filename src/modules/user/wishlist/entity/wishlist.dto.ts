import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewWishlistItem {
  @ApiProperty()
  @IsNotEmpty()
  product_id: number;
}

export class SpecificWishlistItem {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
