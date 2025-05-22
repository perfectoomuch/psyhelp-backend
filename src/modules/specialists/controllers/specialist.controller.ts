import { Body, Controller, Get, Post } from '@nestjs/common';
import { SpecialistService } from '../services/specialist.service';
import { BidFormDto } from '@/modules/bids/dtos/bid.dto';

@Controller('specialists')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Get()
  async getAll() {
    return this.specialistService.getAll();
  }

  @Post('filter-by-bid')
  async filterByBid(@Body() data: BidFormDto[]) {
    return this.specialistService.getByFilterBid(data);
  }
}
