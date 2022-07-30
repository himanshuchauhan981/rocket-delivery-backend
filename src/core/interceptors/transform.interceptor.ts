import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { RESPONSE_TYPE } from '../constants/constants';
import { STATUS_CODE } from '../constants/status_code';

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
        if (response.responseType === RESPONSE_TYPE.BLOB) {
          return new StreamableFile(response.data.pdf);
        } else if (response.responseType === RESPONSE_TYPE.CSV) {
          apiResponse.setHeader(
            'Content-Disposition',
            'attachment; filename=transaction.csv',
          );

          apiResponse.setHeader('Content-Type', 'text/csv');
          apiResponse.status(STATUS_CODE.SUCCESS).end(response.data.csv);
        } else if (apiRequest.role == 'ADMIN') {
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
