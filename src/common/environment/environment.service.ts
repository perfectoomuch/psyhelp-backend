import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === 'development';
  }

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  getNodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get(field: string) {
    return this.configService.get(field);
  }
}
