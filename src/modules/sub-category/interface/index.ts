import { ApiProperty } from '@nestjs/swagger';

class SubCategory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export { SubCategory };
