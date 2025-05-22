import { Injectable } from '@nestjs/common';
import { IMethodRepository } from './interface';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Method } from '../../schemas/method.schema';

@Injectable()
export class MethodRepository implements IMethodRepository {
  constructor(
    @InjectModel(Method)
    private readonly model: ReturnModelType<typeof Method>,
  ) {}

  async getAll(): Promise<Method[]> {
    const list = await this.model.find().exec();
    if (list.length === 0) return [];
    const listObjected = list.map((el) => el.toObject());
    return listObjected;
  }

  async getById(id: string): Promise<Method | null> {
    const doc = await this.model.findById(id).exec();
    return doc.toObject();
  }

  async create(data: Method): Promise<Method> {
    const doc = new this.model(data);
    await doc.save();
    return doc.toObject();
  }

  async update(id: string, data: Method): Promise<Method | null> {
    const doc = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return doc.toObject();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
