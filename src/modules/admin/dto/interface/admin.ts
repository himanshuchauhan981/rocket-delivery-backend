// Common Interface

interface ApiResponse {
  statusCode: number;
  message: string;
}

interface FileResponse {
  statusCode: number;
  message: string;
  responseType: string;
}

interface AdminLoginResponse extends ApiResponse {
  data: {
    token: string;
  };
}

interface AdminDetailsResponse extends ApiResponse {
  data: {
    adminDetails: {
      id: number;
      email: string;
    };
  };
}

export { ApiResponse, FileResponse, AdminLoginResponse, AdminDetailsResponse };
