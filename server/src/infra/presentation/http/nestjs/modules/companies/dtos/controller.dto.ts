import { OmitType, PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, IsUrl } from "class-validator";

export class StoreCompanyDTO {
  @ApiProperty({ example: "MyCompany", type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "http://my.company.com", type: String })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  website: string;

  @ApiProperty({ example: "89.819.241/0001-70", type: String })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ example: "userUUID", type: String })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

export class UpdateCompanyDTO extends OmitType(PartialType(StoreCompanyDTO), [
  "userId",
]) {}
