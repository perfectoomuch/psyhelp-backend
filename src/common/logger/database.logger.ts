import { Injectable, LoggerService, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@m8a/nestjs-typegoose';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as mongoose from 'mongoose';

@Injectable()
export class DatabaseLogger implements OnModuleInit {
  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async onModuleInit() {
    const connection = this.connection;
    connection.on('error', (err: any) => {
      this.logger.error('MongoDB: connection error', {
        dbName: connection.name,
        host: connection.host,
        message: err.message,
        stack: err.stack,
        context: 'MongoDB',
      });
    });

    connection.on('disconnected', () => {
      this.logger.error('MongoDB: connection lost');
    });

    connection.on('connected', () => {
      this.logger.log('MongoDB: success connected');
    });

    connection.on('reconnected', () => {
      this.logger.log('MongoDB: reconnected');
    });
  }
}
