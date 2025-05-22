import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from './interface';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { Transaction } from '../../schemas/transaction.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { TransactionStatusEnum } from '../../types/transaction';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(Transaction)
    private readonly model: ReturnModelType<typeof Transaction>,
  ) {}

  async create(data: Transaction): Promise<Transaction> {
    const transaction = new this.model(data);
    await transaction.save();
    return transaction.toObject();
  }

  async updateStatus(
    transaction_id: string,
    status: TransactionStatusEnum,
  ): Promise<Transaction | null> {
    const transaction = await this.model
      .findOneAndUpdate(
        {
          transaction_id,
        },
        {
          status: status as TransactionStatusEnum,
        },
        {
          new: true,
        },
      )
      .exec();

    return transaction.toObject();
  }

  async pushCallback(
    transaction_id: string,
    data: any,
  ): Promise<Transaction | null> {
    const transaction = await this.model
      .findOneAndUpdate(
        { transaction_id },
        {
          $push: {
            callbacks: data,
          },
        },
        { new: true },
      )
      .exec();
    return transaction.toObject();
  }
}
