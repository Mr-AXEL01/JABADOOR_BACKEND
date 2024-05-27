import { IsNotEmpty, IsString } from "class-validator";

export class CreateFilterDto {
    @IsNotEmpty()
  @IsString()
  category_code: string;
   
    ar: { name: string; description: string };
    fr: { name: string; description: string };
    en: { name: string; description: string };
  
    status: string;
  }
  
  export class UpdateFilterDto extends CreateFilterDto {}
  