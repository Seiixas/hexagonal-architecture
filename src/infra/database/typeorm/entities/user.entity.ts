import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { BaseTypeORMEntity } from "../shared/base.entity";
import { CompanyTypeORMEntity } from "./company.entity";

@Entity("users")
export class UserTypeORMEntity extends BaseTypeORMEntity {
  @Column({ name: "name" })
  private _name: string;

  @Column({ name: "email", unique: true })
  private _email: string;

  @Column({ name: "password" })
  private _password: string;

  @OneToMany(() => CompanyTypeORMEntity, (company) => company.user)
  private _companies: CompanyTypeORMEntity[];

  public get name(): string {
    return this._name;
  }
  public get email(): string {
    return this._email;
  }
  public get password(): string {
    return this._password;
  }
  public set name(value: string) {
    this._name = value;
  }
  public set email(value: string) {
    this._email = value;
  }
  public set password(value: string) {
    this._password = value;
  }
  public get companies(): CompanyTypeORMEntity[] {
    return this._companies;
  }
  public set companies(value: CompanyTypeORMEntity[]) {
    this._companies = value;
  }
}
