import { Column, Entity, OneToMany } from "typeorm";
import { BaseTypeORMEntity } from "../shared/base.entity";
import { CompanyTypeORMEntity } from "./company.entity";

@Entity("users")
export class UserTypeORMEntity extends BaseTypeORMEntity {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "email", unique: true })
  email: string;

  @Column({ name: "password" })
  password: string;

  @OneToMany(() => CompanyTypeORMEntity, (company) => company.user)
  companies: CompanyTypeORMEntity[];
}
