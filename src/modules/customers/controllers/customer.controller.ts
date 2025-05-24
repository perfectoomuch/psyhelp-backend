import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CustomerCreateDto, CustomerUpdateDto } from '../dtos/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() data: CustomerCreateDto) {
    return this.customerService.create(data);
  }

  @Post('update/:chat_id')
  async update(
    @Param('chat_id', ParseIntPipe) chat_id: number,
    @Body() data: CustomerUpdateDto,
  ) {
    return this.customerService.update(chat_id, data);
  }

  @Get('/:chat_id')
  async getUser(@Param('chat_id', ParseIntPipe) chat_id: number) {
    return this.customerService.getByChatId(chat_id);
  }
}
