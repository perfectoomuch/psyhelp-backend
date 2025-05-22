import {
  Body,
  Controller,
  Get,
  Headers,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BidService } from '../services/bid.service';
import { BidCreateDto } from '../dtos/bid.dto';

@Controller('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Get('questions')
  async getQuestion() {
    return this.bidService.questions();
  }

  @Post()
  async createBid(@Body() body: BidCreateDto) {
    return this.bidService.create(body);
  }
}
