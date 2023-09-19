import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseTypeORMEntity } from "../shared/base.entity";
import { PlaceTypeORMEntity } from "./place.entity";
import { UserTypeORMEntity } from "./user.entity";

@Entity("companies")
export class CompanyTypeORMEntity extends BaseTypeORMEntity {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "website" })
  website: string;

  @Column({ name: "cnpj", unique: true })
  cnpj: string;

  @OneToMany(() => PlaceTypeORMEntity, (place) => place.company)
  places: PlaceTypeORMEntity[];

  @ManyToOne(() => UserTypeORMEntity, (user) => user.companies)
  user: UserTypeORMEntity;
}
