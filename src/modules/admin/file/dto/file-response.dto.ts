import { ApiProperty } from '@nestjs/swagger';

import { APIResponse } from 'src/modules/common/dto/common.dto';

class FileResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;
}

class CreateFile {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

class ImageList {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  extension: string;

  @ApiProperty()
  size: number;
}

class GetAllFiles {
  @ApiProperty({ type: () => [ImageList] })
  imageList: ImageList[];

  @ApiProperty()
  count: number;
}

class GetFilesBySlug {
  @ApiProperty({ type: () => [ImageList] })
  imageList: ImageList[];
}

class GetAllFilesResponse extends APIResponse {
  @ApiProperty()
  data: GetAllFiles;
}

class CreateFileResponse extends APIResponse {
  @ApiProperty()
  data: CreateFile;
}

class GetFilesBySlugResponse extends APIResponse {
  @ApiProperty()
  data: GetFilesBySlug;
}

export {
  FileResponse,
  CreateFileResponse,
  GetFilesBySlugResponse,
  GetAllFilesResponse,
  ImageList,
};
