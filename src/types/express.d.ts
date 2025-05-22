import 'express';

declare module 'express' {
  export interface Request {
    traceId: string; // Определяем структуру поля
  }
}
