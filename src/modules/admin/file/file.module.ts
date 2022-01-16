import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileProvider } from './file.provider';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService, ...FileProvider],
})
export class FileModule {}
