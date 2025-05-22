import {
  IsEmail,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsString,
} from 'class-validator';

export class CustomerCreateDto {
  @IsNotEmpty()
  @IsNumber()
  chat_id: number;

  @IsNotEmpty()
  @IsString()
  username: string;
}

export class CustomerUpdateDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}
