import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: number;
  data: T;
  responseType: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): any {
    const apiRequest = context.switchToHttp().getRequest();

    const apiResponse = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((response) => {
        if (response.responseType === 'blob') {
          return new StreamableFile(response.data.pdf);
        }

        if (apiRequest.role == 'admin') {
          return {
            statusCode: apiResponse.statusCode,
            message: response.message,
            data: response.data,
          };
        } else {
          return {
            statusCode: apiResponse.statusCode,
            message: response.message,
            ...response.data,
          };
        }
      }),
    );
  }
}
