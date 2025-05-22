import { Module } from '@nestjs/common';
import { SpecialistsModule } from '../specialists/specialists.module';
import { BidService } from './services/bid.service';
import { BidController } from './controllers/bid.controller';
import { BidRepository } from './repo/bid/repository';
import { CustomersModule } from '../customers/customers.module';
import { Bid } from './schemas/bid.schema';
import { TypegooseModule } from '@m8a/nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([Bid]),
    SpecialistsModule,
    CustomersModule,
  ],
  controllers: [BidController],
  providers: [
    {
      provide: 'IBidRepository',
      useClass: BidRepository,
    },
    BidService,
  ],
  exports: [BidService],
})
export class BidsModule {}
