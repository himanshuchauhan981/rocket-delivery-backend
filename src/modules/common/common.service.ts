import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { JWTPayload } from './dto/common.dto';

@Injectable()
export class CommonService {
  constructor(private jwtService: JwtService) {}

  async generateHashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compare(password, hash);
  }

  generateJWTToken(user: JWTPayload): string {
    return this.jwtService.sign(user);
  }
}
