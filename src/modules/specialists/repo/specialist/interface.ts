import { Method } from '../../schemas/method.schema';
import { Specialist } from '../../schemas/specialist.schema';

export interface MethodsPopulated extends Omit<Specialist, 'methods'> {
  methods: Method[];
}

export interface ISpecialistRepository {
  getAll(select: Record<string, number>): Promise<MethodsPopulated[]>;
  getByEmail(email: string): Promise<Specialist | null>;
  getById(id: string): Promise<Specialist | null>;
  create(data: Specialist): Promise<Specialist>;
  update(id: string, data: Specialist): Promise<Specialist | null>;
  delete(id: string): Promise<void>;
}
