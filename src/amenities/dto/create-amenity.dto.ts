import { IsNotEmpty, IsString, IsUrl, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AmenityDto {

  @IsNotEmpty()
  @IsString()
  amenity_code: string;

  @IsOptional()
  @IsUrl()
  icon?: string;

  @IsOptional()
  @IsString()
  svg?: string;

  @IsString()
  type: string;

  @IsObject()
  ar: { name: string };

  @IsObject()
  fr: { name: string };

  @IsObject()
  en: { name: string };
}

export class CreateAmenitiesDto {

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AmenityDto)
  amenities: AmenityDto[];
}
