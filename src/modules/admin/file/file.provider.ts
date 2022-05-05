import { FILE_REPOSITORY } from '../../../core/constants/repositories';
import { File } from './file.entity';

export const FileProvider = [{ provide: FILE_REPOSITORY, useValue: File }];
