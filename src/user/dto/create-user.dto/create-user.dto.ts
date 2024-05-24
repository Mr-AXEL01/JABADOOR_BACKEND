// user.dto.ts
import { IsString, IsOptional, IsEmail, IsDateString, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from 'src/schemas/address.schema';

class SocialMediaDto {
  @IsString()
  instagram: string;

  @IsString()
  facebook: string;
}

export class CreateUserDto {
  @IsString()
  user_code: string;

  @IsString()
  user_name: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  gender: string;

  @IsString()
  birthdate: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsString()
  status: string;

  @IsString()
  gsm: string;

  @IsEmail()
  email: string;

  @IsString()
  language_default: string;

  @IsNumber()
  rate: number;

  @IsNumber()
  count_rate: number;

  @IsDateString()
  added_date: Date;

  @IsOptional()
  @IsString()
  become_creator?: string;

  @IsString()
  type_service: string;

  @IsOptional()
  @IsString()
  wishlistid?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  social_media: SocialMediaDto;

  @IsString()
  password: string;

  @IsString()
  address_code: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  user_code?: string;

  @IsOptional()
  @IsString()
  user_name?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  birthdate?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  address?: Address;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  gsm?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  language_default?: string;

  @IsOptional()
  @IsNumber()
  rate?: number;

  @IsOptional()
  @IsNumber()
  count_rate?: number;

  @IsOptional()
  @IsDateString()
  added_date?: Date;

  @IsOptional()
  @IsString()
  become_creator?: string;

  @IsOptional()
  @IsString()
  type_service?: string;

  @IsOptional()
  @IsString()
  wishlistid?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SocialMediaDto)
  social_media?: SocialMediaDto;

  @IsString()
  password: string;
}
