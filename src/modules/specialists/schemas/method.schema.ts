import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { BaseModel } from '@/core/schemas/base.model';
import { Types } from 'mongoose';

@ModelOptions({
  schemaOptions: {
    collection: 'methods',
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
export class Method extends BaseModel {
  @Prop({
    required: true,
  })
  name!: string;
}
