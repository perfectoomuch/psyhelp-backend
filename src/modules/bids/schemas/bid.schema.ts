import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { BaseModel } from '@/core/schemas/base.model';
import { Types } from 'mongoose';
import { Customer } from '@/modules/customers/schemas/customer.schema';
import { Specialist } from '@/modules/specialists/schemas/specialist.schema';
import { BidStatusEnum } from '../types/bid';

@ModelOptions({
  schemaOptions: {
    collection: 'bids',
    toObject: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        delete ret._id;
        return ret;
      },
    },
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
})
export class Bid extends BaseModel {
  @Prop({ type: () => [Customer], ref: () => Customer, required: true })
  customer!: Ref<Customer | Types.ObjectId>;

  @Prop({ type: () => [Specialist], ref: () => Specialist, required: false })
  specialist!: Ref<Specialist | Types.ObjectId>;

  @Prop({ type: () => [Specialist], ref: () => Specialist, required: false })
  transaction!: Ref<Specialist | Types.ObjectId>;

  @Prop({
    required: true,
    type: () => [{ local_id: Number, question: String, answer: String }],
  })
  body!: Array<{
    local_id: number;
    question: string;
    answer: string;
  }>;

  @Prop({
    required: true,
  })
  date!: string;

  @Prop({
    required: true,
    enum: BidStatusEnum,
    default: BidStatusEnum.IN_AGREEMENT,
  })
  status!: string;

  @Prop({
    default: '',
  })
  link!: string;
}
