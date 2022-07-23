import { ApiResponse } from '../../common/interface';

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

export { AdminLoginResponse, AdminDetailsResponse };
