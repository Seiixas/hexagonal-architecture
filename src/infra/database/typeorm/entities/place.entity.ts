import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseTypeORMEntity } from "../shared/base.entity";
import { CompanyTypeORMEntity } from "./company.entity";

@Entity("places")
export class PlaceTypeORMEntity extends BaseTypeORMEntity {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "cep" })
  cep: string;

  @Column({ name: "street" })
  street: string;

  @Column({ name: "number" })
  number: string;

  @Column({ name: "district" })
  district: string;

  @Column({ name: "city" })
  city: string;

  @Column({ name: "state" })
  state: string;

  @ManyToOne(() => CompanyTypeORMEntity, (company) => company.places)
  company: CompanyTypeORMEntity;
}
