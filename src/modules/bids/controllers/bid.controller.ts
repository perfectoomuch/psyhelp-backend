import { Controller } from '@nestjs/common';
import { BidService } from '../services/bid.service';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}
}
