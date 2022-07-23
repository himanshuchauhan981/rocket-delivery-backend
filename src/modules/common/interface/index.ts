interface ApiResponse {
  statusCode: number;
  message: string;
}

interface FileResponse {
  statusCode: number;
  message: string;
  responseType: string;
}

export { ApiResponse, FileResponse };
