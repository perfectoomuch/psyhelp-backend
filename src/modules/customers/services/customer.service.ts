import {
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { CustomerRepository } from '../repo/customer/repository';
import { CustomerCreateDto, CustomerUpdateDto } from '../dtos/customer.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepo: CustomerRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async getByChatId(chat_id: number) {
    const customer = await this.customerRepo.getByChatId(chat_id);

    if (!customer) {
      throw new NotFoundException(`customer not found: ${chat_id}`);
    }

    return customer;
  }

  async create(data: CustomerCreateDto) {
    try {
      const customer = await this.customerRepo.create(data);
      if (!customer) {
        throw new Error('customer not found');
      }
      return customer;
    } catch (err) {
      this.logger.error('customer create', err);
    }
  }

  async update(chat_id: number, data: CustomerUpdateDto) {
    try {
      const customer = await this.customerRepo.update(chat_id, data);
      if (!customer) {
        throw new Error('customer not found');
      }
      return customer;
    } catch (err) {
      this.logger.error('customer update', err);
    }
  }
}
