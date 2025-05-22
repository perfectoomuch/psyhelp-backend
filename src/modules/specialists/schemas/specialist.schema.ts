import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { BaseModel } from '@/core/schemas/base.model';
import { Types } from 'mongoose';
import { Method } from './method.schema';
import dayjs from 'dayjs';
import { CustomerExperienceRouteInterface } from '@/modules/customers/types/customer';

@ModelOptions({
  schemaOptions: {
    collection: 'specialists',
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
export class Specialist extends BaseModel {
  @Prop({
    required: true,
  })
  first_name!: string;

  @Prop({
    required: true,
  })
  last_name!: string;

  @Prop({
    required: true,
  })
  email!: string;

  @Prop({ type: () => [Method], ref: () => Method, required: true })
  methods: Ref<Method | Types.ObjectId>[];

  @Prop({
    required: true,
    type: () => [String],
    enum: CustomerExperienceRouteInterface, // для себя / ребенка / пары / супервизии
  })
  experience_route!: string[];

  @Prop({
    required: true,
  })
  experience_years: number;

  @Prop({
    required: true,
  })
  photo!: string;

  @Prop({
    required: false,
    default: '',
  })
  video!: string;

  @Prop({
    required: true,
    enum: ['female', 'male'],
  })
  gender!: string;

  @Prop({
    required: true,
  })
  birth_year!: number;

  @Prop({
    required: true,
  })
  price!: number;

  @Prop({
    required: true,
  })
  message!: string;

  @Prop({
    required: true,
  })
  education!: string;

  @Prop({
    required: true,
    enum: ['psychologist', 'psychotherapist', 'coach'],
  })
  profession!: string;

  @Prop({
    required: true,
  })
  sessions!: number;

  public age() {
    const currentYear = new Date().getFullYear();
    const docYear = this.birth_year;

    return currentYear - docYear;
  }
}
