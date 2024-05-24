import { IsString, IsNumber, IsBoolean, IsOptional, IsMongoId, IsNotEmpty, IsArray } from 'class-validator';
import { Translation } from '../interfaces/translation.interface';

export class CreateLogementDto {

  @IsNotEmpty()
  @IsString()
  logement_code: string;

  @IsString()
  nom: string;

  @IsString()
  @IsNotEmpty()
  readonly address_code: string;

  @IsString()
  @IsNotEmpty()
  readonly category_code: string;

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
