import { ApiProperty } from '@nestjs/swagger';

class MeasuringUnit {
  @ApiProperty()
  id: number;

  @ApiProperty()
  measuring_type: string;

  @ApiProperty()
  symbol: string;
}

export { MeasuringUnit };
