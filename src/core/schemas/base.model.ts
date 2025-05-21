import { Prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export abstract class BaseModel {
  _id?: Types.ObjectId;

  @Prop({ default: () => new Date() })
  created_at?: Date;

  @Prop({ default: () => new Date() })
  updated_at?: Date;
}
