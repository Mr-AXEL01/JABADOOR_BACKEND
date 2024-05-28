import { IsNotEmpty, IsString, IsNumber, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class GuestsDto {
  @IsNotEmpty()
  @IsNumber()
  adults: number;

  @IsNotEmpty()
  @IsNumber()
  children: number;

  @IsNotEmpty()
  @IsNumber()
  babies: number;
}

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  reservation_code: string;

  @IsNotEmpty()
  @IsString()
  user_code: string;

  @IsNotEmpty()
  @IsString()
  logement_code: string;

  @IsNotEmpty()
  @IsDateString()
  check_in_date: string;

  @IsNotEmpty()
  @IsDateString()
  check_out_date: string;

  @IsNotEmpty()
  @IsNumber()
  number_of_guests: number;

  @ValidateNested()
  @Type(() => GuestsDto)
  list_guests: GuestsDto;

  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsDateString()
  added_date: string;
}
