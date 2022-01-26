import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CartItems {
	@ApiProperty()
	@IsNotEmpty()
	id: number;

	@ApiProperty()
	@IsNotEmpty()
	quantity: number;
}

export class NewOrder {
	@ApiProperty()
	@IsNotEmpty()
	cart_items: CartItems[];

	@ApiProperty()
	@IsNotEmpty()
	order_address: number;

	@ApiProperty()
	@IsNotEmpty()
	delivery_charges: number;

	@ApiProperty()
	@IsNotEmpty()
	payment_method: number;

	@ApiProperty({ required: false })
	payment_id: string;

	@ApiProperty({ required: false })
	payment_order_id: string;

	@ApiProperty({ required: false })
	user_payment_id: number;

}

export class SpecificOrder {
	@ApiProperty()
	@IsNotEmpty()
	id: number;
}