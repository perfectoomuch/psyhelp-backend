import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { Module } from '@nestjs/common';
import { Transaction } from './schemas/transaction.schema';

@Module({
  imports: [TypegooseModule.forFeature([Transaction])],
  controllers: [],
  providers: [],
})
export class TransactionsModule {}
