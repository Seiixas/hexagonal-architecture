import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, IsUUID, IsUrl } from "class-validator";

export class StoreBodyDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUrl()
  website: string;

  @IsString()
  cnpj: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

export class UpdateBodyDTO extends OmitType(PartialType(StoreBodyDTO), [
  "userId",
]) {}
