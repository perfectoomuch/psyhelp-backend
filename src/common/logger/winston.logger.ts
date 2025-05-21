import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'fs';
import dayjs from 'dayjs';

const filterOnly = (level: string) => {
  return winston.format((info) => {
    return info.level === level ? info : false;
  })();
};

const getLogFolderPath = () => {
  const today = dayjs().format('DD-MM-YYYY');
  const folderPath = join(__dirname, '..', '..', '..', 'logs', today);

  if (!existsSync(folderPath)) {
    mkdirSync(folderPath, { recursive: true });
  }

  return folderPath;
};

export const createWinstonConfig = (
  configService: ConfigService,
): winston.LoggerOptions => {
  const loggerToken = configService.get<string>('LOGGER_TOKEN');
  const loggerHost = configService.get<string>('LOGGER_HOST');

  const logFolderPath = getLogFolderPath();

  const transports: winston.transport[] = [
    new winston.transports.Console({
      level: 'warn',
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('Nest', {
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      filename: join(logFolderPath, 'error.log'),
      format: winston.format.combine(
        filterOnly('error'),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: join(logFolderPath, 'info.log'),
      format: winston.format.combine(
        filterOnly('info'),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: join(logFolderPath, 'warn.log'),
      format: winston.format.combine(
        filterOnly('warn'),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ];

  // const logtail = new Logtail(loggerToken, {
  //   endpoint: loggerHost,
  // });
  // transports.push(new LogtailTransport(logtail));

  return {
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    ),
    transports,
  };
};
