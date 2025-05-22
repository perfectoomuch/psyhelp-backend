import { Injectable } from '@nestjs/common';
import { ISpecialistRepository } from './interface';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { Specialist } from '../../schemas/specialist.schema';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class SpecialistRepository implements ISpecialistRepository {
  constructor(
    @InjectModel(Specialist)
    private readonly model: ReturnModelType<typeof Specialist>,
  ) {}

  async getAll(): Promise<Specialist[]> {
    const list = await this.model.find().exec();
    if (list.length === 0) return [];
    const listObjected = list.map((el) => el.toObject());
    return listObjected;
  }

  async getByEmail(email: string): Promise<Specialist | null> {
    const doc = await this.model.findOne({ email }).exec();
    return doc.toObject();
  }

  async getById(id: string): Promise<Specialist | null> {
    const doc = await this.model.findById(id).exec();
    return doc.toObject();
  }

  async create(data: Specialist): Promise<Specialist> {
    const doc = new this.model(data);
    await doc.save();
    return doc.toObject();
  }

  async update(id: string, data: Specialist): Promise<Specialist | null> {
    const doc = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return doc.toObject();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
