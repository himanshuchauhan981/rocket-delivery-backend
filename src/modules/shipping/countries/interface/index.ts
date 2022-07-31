import { ApiProperty } from '@nestjs/swagger';

class StateListCountry {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export { StateListCountry };
