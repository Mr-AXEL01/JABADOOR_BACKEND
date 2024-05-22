import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  languageCode: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  gsm: string;

  @IsString()
  address: string;

  @IsString()
  picture: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  addeddate: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, { message: 'password too weak' })
  password: string; // Add password field for authentication
}
