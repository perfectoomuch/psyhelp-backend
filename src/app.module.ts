import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpCodeInterceptor } from './core/interceptors/HttpCodeInterceptor';
import { WinstonModule } from 'nest-winston';
import { HttpLoggerInterceptor } from './core/interceptors/HttpLoggerInterceptor';
import { createWinstonConfig } from './common/logger/winston.logger';
import { DatabaseLogger } from './common/logger/database.logger';
import { EnvironmentModule } from './common/environment/environment.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SpecialistsModule } from './modules/specialists/specialists.module';
import { UsersModule } from './modules/users/users.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { BidsModule } from './modules/bids/bids.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypegooseModule.forRoot(process.env.MONGODB_URI),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return createWinstonConfig(configService);
      },
    }),
    EnvironmentModule,
    CustomersModule,
    SpecialistsModule,
    UsersModule,
    TelegramModule,
    BidsModule,
    TransactionsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCodeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggerInterceptor,
    },
    DatabaseLogger,
  ],
})
export class AppModule {}
