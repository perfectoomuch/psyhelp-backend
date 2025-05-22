import { Inject, Injectable } from '@nestjs/common';
import { MethodRepository } from '../repo/method/repository';

@Injectable()
export class MethodService {
  constructor(
    @Inject('IMethodRepository') private readonly methodRepo: MethodRepository,
  ) {}

  async getMethods() {
    return this.methodRepo.getAll();
  }
}
