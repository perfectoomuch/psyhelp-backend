import {
  BadGatewayException,
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { BidRepository } from '../repo/bid/repository';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import questions from '@/static/questions.json';
import { MethodService } from '@/modules/specialists/services/method.service';
import { BidCreateInterface } from '../types/bid';
import { CustomerService } from '@/modules/customers/services/customer.service';
import { plainToInstance } from 'class-transformer';
import { Bid } from '../schemas/bid.schema';

@Injectable()
export class BidService {
  constructor(
    @Inject('IBidRepository') private readonly bidRepo: BidRepository,
    private readonly methodService: MethodService,
    private readonly customerService: CustomerService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async questions() {
    try {
      const list = await Promise.all(
        questions.map(async (el) => {
          if (el.variants.length > 0) {
            return el;
          }

          if (el.field === 'method') {
            const variants = await this.methodService.getMethods();
            return {
              ...el,
              variants: variants.map((el) => el.name),
            };
          }
        }),
      );
      return list;
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  async create(data: BidCreateInterface) {
    try {
      const customer = await this.customerService.getByChatId(data.chat_id);

      const bid = await this.bidRepo.create(
        plainToInstance(Bid, {
          customer: customer.id,
          specialist: data.specialist_id,
          date: data.date,
          body: data.form,
        }),
      );

      return { message: 'success created', bid };
      // return data;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new BadGatewayException(err);
    }
  }
}
