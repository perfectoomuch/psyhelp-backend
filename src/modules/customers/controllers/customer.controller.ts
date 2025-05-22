import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CustomerUpdateDto } from '../dtos/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('update/:chat_id')
  async update(
    @Param('chat_id', ParseIntPipe) chat_id: number,
    @Body() data: CustomerUpdateDto,
  ) {
    return this.customerService.update(chat_id, data);
  }
}
