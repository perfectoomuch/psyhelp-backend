import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class BidFormDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  local_id: number;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  answer: string[];

  @IsString()
  field: string;
}

export class BidBaseDto {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  chat_id: number;
}

export class BidCreateDto extends BidBaseDto {
  @IsNotEmpty()
  @IsString()
  specialist_id: string;

  @IsString()
  date: string;

  form: BidFormDto[];
}
