import { ADMIN_REPOSITORY } from 'src/core/constants/repositories';
import { Admin } from './admin.entity';

export const AdminProvider = [{ provide: ADMIN_REPOSITORY, useValue: Admin }];
