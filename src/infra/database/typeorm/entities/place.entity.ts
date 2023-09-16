import { Column, Entity, ManyToOne } from "typeorm";
import { BaseTypeORMEntity } from "../shared/base.entity";
import { CompanyTypeORMEntity } from "./company.entity";

@Entity("places")
export class PlaceTypeORMEntity extends BaseTypeORMEntity {
  @Column({ name: "name" })
  private _name: string;

  @Column({ name: "cep" })
  private _cep: string;

  @Column({ name: "street" })
  private _street: string;

  @Column({ name: "number" })
  private _number: string;

  @Column({ name: "district" })
  private _district: string;

  @Column({ name: "city" })
  private _city: string;

  @Column({ name: "state" })
  private _state: string;

  @ManyToOne(() => CompanyTypeORMEntity)
  private _company: CompanyTypeORMEntity;

  public get name(): string {
    return this._name;
  }
  public get cep(): string {
    return this._cep;
  }
  public get street(): string {
    return this._street;
  }
  public get number(): string {
    return this._number;
  }
  public get district(): string {
    return this._district;
  }
  public get city(): string {
    return this._city;
  }
  public get state(): string {
    return this._state;
  }
  public set name(value: string) {
    this._name = value;
  }
  public set cep(value: string) {
    this._cep = value;
  }
  public set street(value: string) {
    this._street = value;
  }
  public set number(value: string) {
    this._number = value;
  }
  public set district(value: string) {
    this._district = value;
  }
  public set city(value: string) {
    this._city = value;
  }
  public set state(value: string) {
    this._state = value;
  }
  public set company(value: CompanyTypeORMEntity) {
    this._company = value;
  }
  public get company() {
    return this._company;
  }
}
