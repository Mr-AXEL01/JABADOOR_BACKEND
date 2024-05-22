import { IsString, IsNumber, IsBoolean, IsOptional, IsMongoId, IsNotEmpty, IsArray } from 'class-validator';
import { Translation } from '../interfaces/translation.interface';

export class CreateLogementDto {
  @IsString()
  nom: string;

  @IsString()
  @IsNotEmpty()
  readonly addressId: string;

  @IsString()
  @IsNotEmpty()
  readonly categoryId: string;

  @IsArray()
  @IsOptional()
  readonly amenitiesIds?: string[];

  @IsString()
  telephone: string;

  @IsOptional()
  @IsNumber()
  bedrooms?: number;

  @IsOptional()
  @IsNumber()
  baths?: number;

  @IsString()
  superficie: string;

  @IsOptional()
  @IsNumber()
  beds?: number;

  @IsNumber()
  guests: number;

  @IsString()
  etat: string;

  @IsOptional()
  @IsBoolean()
  terrasse?: boolean;

  @IsOptional()
  @IsBoolean()
  garage?: boolean;

  @IsOptional()
  translations?: {
    fr: Translation;
    ar: Translation;
  };
}
