export class CreateFileResponse {
  statusCode: number;
  message: string;
  data: { id: string; name: string };
}

export class ImageList {
  id: number;
  name: string;
  url: string;
}

export class GetAllFilesResponse {
  statusCode: number;
  message: string;
  data: { imageList: ImageList[]; count: number };
}

export class GetFilesBySlugResponse {
  statusCode: number;
  message: string;
  data: { imageList: ImageList[] };
}
