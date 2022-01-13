import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: number;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): any {
    const apiResponse = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((response) => {
        return {
          statusCode: apiResponse.statusCode,
          message: response.message,
          data: response.data,
        };
      }),
    );
  }
}
