import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class StorePlaceDTO {
  @ApiProperty({ example: "Main", type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "60160-250", type: String })
  @IsString()
  @IsNotEmpty()
  cep: string;

  @ApiProperty({ example: "Avenida Principal", type: String })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: "250", type: String })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ example: "Centro", type: String })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ example: "Fortaleza", type: String })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: "CE", type: String })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: "companyUUID", type: String })
  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}

export class UpdatePlaceDTO extends PartialType(StorePlaceDTO) {}
