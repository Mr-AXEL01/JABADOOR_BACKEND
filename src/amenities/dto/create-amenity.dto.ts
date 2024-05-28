import { IsNotEmpty, IsString, IsUrl, IsObject } from 'class-validator';

export class CreateAmenityDto {

  @IsNotEmpty()
  @IsString()
  amenity_code: string;

  @IsNotEmpty()
  @IsUrl()
  icon: string;

  @IsObject()
  ar: { name: string };

  @IsObject()
  fr: { name: string };

  @IsObject()
  en: { name: string };
  
}
