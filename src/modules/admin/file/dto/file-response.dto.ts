import { ApiProperty } from '@nestjs/swagger';

class FileResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;
}

export { FileResponse };
