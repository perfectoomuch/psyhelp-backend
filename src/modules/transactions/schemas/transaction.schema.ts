import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { BaseModel } from '@/core/schemas/base.model';
import { Types } from 'mongoose';
import { TransactionStatusEnum } from '../types/transaction';

@ModelOptions({
  schemaOptions: {
    collection: 'transactions',
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
export class Transaction extends BaseModel {
  @Prop({
    required: true,
  })
  transaction_id!: string;

  @Prop({
    required: true,
  })
  gateway!: string;

  @Prop({
    required: true,
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.PENDING,
  })
  status!: string;

  @Prop({
    required: true,
  })
  link!: string;

  @Prop({
    required: true,
    default: [],
  })
  callbacks!: any[];
}
