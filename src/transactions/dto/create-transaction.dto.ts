import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  transaction_code: string;

  @IsNotEmpty()
  reservation: Types.ObjectId;

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
