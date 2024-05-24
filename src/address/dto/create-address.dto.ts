import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {

  @IsNotEmpty()
  @IsString()
  address_code: string;

  fr: {
    address: string;
    city: string;
    country: string;
  };

  en: {
    address: string;
    city: string;
    country: string;
  };

  ar: {
    address: string;
    city: string;
    country: string;
  };
}
