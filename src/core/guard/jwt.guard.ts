import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { MESSAGES } from '../constants/messages';
import { STATUS_CODE } from '../constants/status_code';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authorization = context.getArgs()[0].headers.authorization;
    const request = context.switchToHttp().getRequest();
    
    if(authorization) {
			const token = authorization.split(' ')[1];

			try {
				const userDetails: any = jwt.verify(token, process.env.JWT_KEY);

				request.userId = userDetails.id;
				request.role = userDetails.role;

				return true;
			}
			catch(err) {
				throw new HttpException(MESSAGES.EXPIRED_TOKEN, STATUS_CODE.UNAUTHORIZED);
			}
    }
		else {
			throw new HttpException(MESSAGES.REQUIRED_JWT_TOKEN, STATUS_CODE.UNAUTHORIZED);
		}
  }
}
