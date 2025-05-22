import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { BidRepository } from '../repo/bid/repository';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class BidService {
  constructor(
    @Inject('IBidRepository') private readonly bidRepo: BidRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async create() {}
}
