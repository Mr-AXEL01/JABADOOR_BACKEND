import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  category_code: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  ar: { name: string };

  @IsNotEmpty()
  fr: { name: string };

  @IsNotEmpty()
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
