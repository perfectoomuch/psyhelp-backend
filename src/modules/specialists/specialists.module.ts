import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { Module } from '@nestjs/common';
import { Specialist } from './schemas/specialist.schema';
import { Method } from './schemas/method.schema';
import { SpecialistRepository } from './repo/specialist/repository';
import { MethodRepository } from './repo/method/repository';
import { SpecialistService } from './services/specialist.service';
import { MethodService } from './services/method.service';

@Module({
  imports: [TypegooseModule.forFeature([Specialist, Method])],
  controllers: [],
  providers: [
    {
      provide: 'ISpecialistRepository',
      useClass: SpecialistRepository,
    },
    {
      provide: 'IMethodRepository',
      useClass: MethodRepository,
    },
    SpecialistService,
    MethodService,
  ],
  exports: [SpecialistService, MethodService],
})
export class SpecialistsModule {}
