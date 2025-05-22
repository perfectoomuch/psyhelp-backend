import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from './interface';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { Customer } from '../../schemas/customer.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import {
  CustomerCreateInterface,
  CustomerUpdateInterface,
} from '../../types/customer';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectModel(Customer)
    private readonly model: ReturnModelType<typeof Customer>,
  ) {}

  async create(data: CustomerCreateInterface): Promise<Customer> {
    const customer = new this.model(data);
    await customer.save();
    return customer.toObject();
  }

  async update(
    chat_id: number,
    data: CustomerUpdateInterface,
  ): Promise<Customer> {
    const customer = await this.model.findOneAndUpdate({ chat_id }, data, {
      new: true,
    });
    return customer;
  }

  async getByChatId(chat_id: number): Promise<Customer | null> {
    const customer = await this.model.findOne({ chat_id }).exec();
    return customer.toObject();
  }

  async getByEmail(email: string): Promise<Customer | null> {
    const customer = await this.model
      .findOne({ email })
      .where('email')
      .ne('')
      .exec();
    return customer.toObject();
  }
}
