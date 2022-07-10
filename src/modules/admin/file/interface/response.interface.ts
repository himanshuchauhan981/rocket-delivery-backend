interface CreateFileResponse {
  statusCode: number;
  message: string;
  data: { id: string; name: string };
}

interface ImageList {
  id: number;
  name: string;
  url: string;
  created_at: string;
  type: string;
  extension: string;
  size: number;
}

interface GetAllFilesResponse {
  statusCode: number;
  message: string;
  data: { imageList: ImageList[]; count: number };
}

interface GetFilesBySlugResponse {
  statusCode: number;
  message: string;
  data: { imageList: ImageList[] };
}

export {
  CreateFileResponse,
  ImageList,
  GetAllFilesResponse,
  GetFilesBySlugResponse,
};
