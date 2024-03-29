import { ApiProperty } from '@nestjs/swagger';

class Category {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export { Category };
