import { ApiProperty } from '@nestjs/swagger';

import { APIResponse } from 'src/modules/common/dto/common.dto';
import { State } from 'src/modules/shipping/states/interface';

class StatesList {
  @ApiProperty({ type: () => [State] })
  states: State[];

  @ApiProperty()
  count: number;
}

class StatesListResponse extends APIResponse {
  @ApiProperty()
  data: StatesList;
}

export { StatesListResponse };
