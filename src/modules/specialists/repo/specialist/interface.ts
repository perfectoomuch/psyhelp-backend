import { Specialist } from '../../schemas/specialist.schema';

export interface ISpecialistRepository {
  getAll(): Promise<Specialist[]>;
  getByEmail(email: string): Promise<Specialist | null>;
  getById(id: string): Promise<Specialist | null>;
  create(data: Specialist): Promise<Specialist>;
  update(id: string, data: Specialist): Promise<Specialist | null>;
  delete(id: string): Promise<void>;
}
