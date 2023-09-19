import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class StoreUserDTO {
  @ApiProperty({ example: "john@doe.com", type: String })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "John Doe", type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "my-secret-password", type: String })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO extends PartialType(StoreUserDTO) {}
