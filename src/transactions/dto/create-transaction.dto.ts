import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class HostDto {
  @IsNotEmpty()
  @IsString()
  host_code: string;

  @IsNotEmpty()
  @IsNumber()
  host_price_per_night: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  transaction_code: string;

  @IsNotEmpty()
  @IsString()
  user_code: string;

  @IsNotEmpty()
  @IsString()
  logement_code: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HostDto)
  host_list: HostDto[];

  @IsNotEmpty()
  @IsNumber()
  total_amount_HT: number;

  @IsNotEmpty()
  @IsNumber()
  tva_amount: number;

  @IsNotEmpty()
  @IsNumber()
  total_amount_TTC: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  method_payment: string;

  @IsNotEmpty()
  @IsString()
  type_service: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsDateString()
  added_date: string;
}
