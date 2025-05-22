import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { BaseModel } from '@/core/schemas/base.model';
import { Types } from 'mongoose';
import { Customer } from '@/modules/customers/schemas/customer.schema';
import { Specialist } from '@/modules/specialists/schemas/specialist.schema';
import { BidStatusEnum } from '../types/bid';
import { Transform } from 'class-transformer';

export class BidBodyItem {
  @Prop({ required: true })
  local_id!: number;

  @Prop({ required: true })
  question!: string;

  @Prop({ type: () => [String], required: true })
  answer!: string[];

  @Prop({
    required: false,
    default: '',
  })
  field: string;
}

@ModelOptions({
  schemaOptions: {
    collection: 'bids',
    id: true,
    toObject: {
      virtuals: true,
      versionKey: false,
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
  @Transform(({ value }) => new Types.ObjectId(value))
  @Prop({ type: () => Customer, ref: () => Customer, required: true })
  customer!: Ref<Customer | Types.ObjectId>;

  @Transform(({ value }) => new Types.ObjectId(value))
  @Prop({ type: () => Specialist, ref: () => Specialist, required: false })
  specialist!: Ref<Specialist | Types.ObjectId>;

  @Prop({ type: () => [Specialist], ref: () => Specialist, required: false })
  transaction!: Ref<Specialist | Types.ObjectId>;

  @Prop({
    required: true,
    type: () => [BidBodyItem],
  })
  body!: BidBodyItem[];

  @Prop({
    required: false,
    default: '',
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
