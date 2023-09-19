import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class StoreBodyDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}

export class UpdateBodyDTO extends PartialType(StoreBodyDTO) {}
