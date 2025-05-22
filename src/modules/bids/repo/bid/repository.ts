import { InjectModel } from '@m8a/nestjs-typegoose';
import { IBidRepository } from './interface';
import { Bid } from '../../schemas/bid.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { BidStatusEnum } from '../../types/bid';

export class BidRepository implements IBidRepository {
  constructor(
    @InjectModel(Bid)
    private readonly model: ReturnModelType<typeof Bid>,
  ) {}

  async create(data: Bid): Promise<Bid> {
    const doc = new this.model(data);
    await doc.save();
    return doc.toObject();
  }

  async getAll(): Promise<Bid[]> {
    const docs = await this.model.find().exec();
    return docs.map((el) => el.toObject());
  }

  async getByCustomer(customer: string): Promise<Bid[]> {
    const docs = await this.model.find({ customer }).exec();
    return docs.map((el) => el.toObject());
  }

  async getById(id: string): Promise<Bid | null> {
    const doc = await this.model.findById(id).exec();
    return doc.toObject();
  }

  async updateStatus(id: string, status: BidStatusEnum): Promise<Bid | null> {
    const doc = await this.model
      .findByIdAndUpdate(
        id,
        {
          status: status as BidStatusEnum,
        },
        { new: true },
      )
      .exec();

    return doc.toObject();
  }
}
