import { IsNotEmpty, IsString, IsUrl, IsObject } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_code: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsObject()
  ar: { name: string };

  @IsObject()
  fr: { name: string };

  @IsObject()
  en: { name: string };

  @IsNotEmpty()
  @IsString()
  type_service: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  added_date: string;
}
