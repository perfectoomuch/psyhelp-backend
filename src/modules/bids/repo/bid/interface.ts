import { Bid } from '../../schemas/bid.schema';
import { BidStatusEnum } from '../../types/bid';

export interface IBidRepository {
  create(data: Bid): Promise<Bid>;
  getAll(): Promise<Bid[]>;
  getById(id: string): Promise<Bid | null>;
  getByCustomer(customer: string): Promise<Bid[]>;
  updateStatus(id: string, status: BidStatusEnum): Promise<Bid | null>;
}
