import {
  CallHandler,
  ExecutionContext,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  maskSensitiveFields(obj: Record<string, any>): Record<string, any> {
    const sensitiveKeys = ['password', 'code'];
    const tokenKeys = ['session_token', 'sessionToken'];

    // Клонируем объект, чтобы не менять оригинал
    const clone = { ...obj };

    for (const key in clone) {
      if (!Object.prototype.hasOwnProperty.call(clone, key)) continue;

      const value = clone[key];

      if (sensitiveKeys.includes(key)) {
        clone[key] = '*****'; // Полная маскировка
      } else if (tokenKeys.includes(key)) {
        if (typeof value === 'string' && value.length > 16) {
          clone[key] = `${value.slice(0, value.length - 16)}****************`;
        } else {
          clone[key] = '[MASKED]'; // если токен подозрительно короткий
        }
      } else if (typeof value === 'object' && value !== null) {
        // Рекурсивно проходим вложенные объекты
        clone[key] = this.maskSensitiveFields(value);
      }
    }

    return clone;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const {
      ip,
      method,
      originalUrl,
      body: requestBody,
      headers,
      traceId,
    } = request;

    const userAgent = headers['user-agent'];

    const now = Date.now();

    return next.handle().pipe(
      tap((responseBody) => {
        const response = ctx.getResponse();
        const { statusCode } = response;

        const delay = Date.now() - now;

        const logBody = {
          traceId,
          timestamp: new Date().toISOString(),
          url: originalUrl,
          method,
          requestBody: this.maskSensitiveFields(requestBody),
          responseBody: this.maskSensitiveFields(responseBody),
          statusCode,
          userIp: ip,
          userAgent,
          delayMs: delay,
        };

        this.logger.log(originalUrl, logBody);
      }),
      catchError((error) => {
        const delay = Date.now() - now;
        const statusCode = error?.response?.statusCode ?? 500;

        const logBody = {
          traceId,
          timestamp: new Date().toISOString(),
          url: originalUrl,
          method,
          requestBody: this.maskSensitiveFields(requestBody),
          responseBody: error.response,
          statusCode: statusCode,
          userIp: ip,
          userAgent,
          delayMs: delay,
        };

        if (statusCode >= 500) {
          this.logger.error(error.message, logBody);
        } else {
          this.logger.warn(error.message, logBody);
        }

        return throwError(() => error);
      }),
    );
  }
}
