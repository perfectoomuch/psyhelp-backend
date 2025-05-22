import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { BaseModel } from '@/core/schemas/base.model';
import { Types } from 'mongoose';

@ModelOptions({
  schemaOptions: {
    collection: 'customers',
    toObject: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret._id?.toString(); // 👈 вручную добавляем id
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
export class Customer extends BaseModel {
  @Prop({
    required: false,
    trim: true,
    lowercase: true,
    default: '',
  })
  email!: string;

  @Prop({
    required: true,
    unique: true,
  })
  chat_id!: number;

  @Prop({
    required: false,
    default: '',
  })
  username!: string;

  @Prop({
    required: false,
    default: '',
  })
  first_name: string;

  @Prop({
    required: false,
    default: '',
  })
  last_name: string;
}
