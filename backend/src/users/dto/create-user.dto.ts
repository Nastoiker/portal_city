import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
  @IsOptional()
  @IsNumber()
  roles?: number;
}
