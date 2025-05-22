import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { Module } from '@nestjs/common';
import { Customer } from './schemas/customer.schema';
import { CustomerRepository } from './repo/customer/repository';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';

@Module({
  imports: [TypegooseModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
    CustomerService,
  ],
  exports: [CustomerService],
})
export class CustomersModule {}
