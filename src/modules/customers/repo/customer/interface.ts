import { Customer } from '../../schemas/customer.schema';
import {
  CustomerCreateInterface,
  CustomerUpdateInterface,
} from '../../types/customer';

export interface ICustomerRepository {
  create(data: CustomerCreateInterface): Promise<Customer>;
  update(chat_id: number, data: CustomerUpdateInterface): Promise<Customer>;
  getByChatId(chat_id: number): Promise<Customer | null>;
  getByEmail(email: string): Promise<Customer | null>;
}
