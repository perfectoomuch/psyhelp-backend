import { Method } from '../../schemas/method.schema';

export interface IMethodRepository {
  getAll(): Promise<Method[]>;
  getById(id: string): Promise<Method | null>;
  create(data: Method): Promise<Method>;
  update(id: string, data: Method): Promise<Method | null>;
  delete(id: string): Promise<void>;
}
