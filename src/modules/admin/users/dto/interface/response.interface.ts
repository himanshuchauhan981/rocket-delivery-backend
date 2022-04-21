import {
  ApiResponse,
  FileResponse,
} from 'src/modules/admin/dto/interface/admin';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  mobile_number: string;
  is_active: number;
  profile_image: string;
}

interface ListUsersResponse extends ApiResponse {
  data: {
    userList: User[];
    count: number;
  };
}

interface DownloadUserCSVResponse extends FileResponse {
  data: {
    csv: string;
  };
}

export { ListUsersResponse, DownloadUserCSVResponse };
