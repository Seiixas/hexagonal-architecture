import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class StoreBodyDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
