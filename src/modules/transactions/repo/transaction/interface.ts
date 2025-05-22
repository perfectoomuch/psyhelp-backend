import { Transaction } from '../../schemas/transaction.schema';
import { TransactionStatusEnum } from '../../types/transaction';

export interface ITransactionRepository {
  create(data: Transaction): Promise<Transaction>;
  updateStatus(
    transaction_id: string,
    status: TransactionStatusEnum,
  ): Promise<Transaction | null>;
  pushCallback(transaction_id: string, data: any): Promise<Transaction | null>;
}
