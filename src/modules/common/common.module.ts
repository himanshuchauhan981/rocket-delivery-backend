import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { CommonService } from './common.service';

@Module({
  imports: [JwtModule.register({ secret: 'eyJhbGciOiJIUzI1NiJ9' })],
  providers: [CommonService],
})
export class CommonModule {}
