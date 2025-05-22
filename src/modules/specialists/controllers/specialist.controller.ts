import { Controller, Post } from '@nestjs/common';
import { SpecialistService } from '../services/specialist.service';

@Controller()
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Post('filter')
  async filter() {}

  @Post('bid')
  async bid() {}
}
