import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseTypeORMEntity } from "../shared/base.entity";
import { PlaceTypeORMEntity } from "./place.entity";
import { UserTypeORMEntity } from "./user.entity";

@Entity("companies")
export class CompanyTypeORMEntity extends BaseTypeORMEntity {
  @Column({ name: "name" })
  private _name: string;

  @Column({ name: "website" })
  private _website: string;

  @Column({ name: "cnpj", unique: true })
  private _cnpj: string;

  @OneToMany(() => PlaceTypeORMEntity, (place) => place.company)
  private _places: PlaceTypeORMEntity[];

  @ManyToOne(() => UserTypeORMEntity, (user) => user.companies)
  private _user: UserTypeORMEntity;

  public get name(): string {
    return this._name;
  }
  public get website(): string {
    return this._website;
  }
  public get cnpj(): string {
    return this._cnpj;
  }
  public set name(value: string) {
    this._name = value;
  }
  public set website(value: string) {
    this._website = value;
  }
  public set cnpj(value: string) {
    this._cnpj = value;
  }
  public get places(): PlaceTypeORMEntity[] {
    return this._places;
  }
  public set places(value: PlaceTypeORMEntity[]) {
    this._places = value;
  }
  public get user(): UserTypeORMEntity {
    return this._user;
  }
  public set user(value: UserTypeORMEntity) {
    this._user = value;
  }
}
