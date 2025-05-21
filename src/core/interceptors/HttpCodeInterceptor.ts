import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpCodeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    // Если статус по умолчанию 201, меняем на 200
    if (response.statusCode === 201) {
      response.status(200);
    }

    return next.handle().pipe(map((data) => data));
  }
}
