import { BaseEntity } from "!domain/base/base";
import { Company } from "!domain/companies/company";

interface ConstructorProps {
  name: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  company: Company;
}

export class Place extends BaseEntity {
  private _name: string;
  private _cep: string;
  private _street: string;
  private _number: string;
  private _district: string;
  private _city: string;
  private _state: string;
  private _company: Company;

  constructor(props: ConstructorProps) {
    super();
    this.name = props.name;
    this.cep = props.cep;
    this.street = props.street;
    this.number = props.number;
    this.district = props.district;
    this.city = props.city;
    this.state = props.state;
    this.company = props.company;
  }

  public get name(): string {
    return this._name;
  }

  public get cep(): string {
    return this._cep;
  }

  public get street(): string {
    return this._street;
  }

  public set street(value: string) {
    this._street = value;
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

  public get company(): Company {
    return this._company;
  }

  public set company(value: Company) {
    this._company = value;
  }
}
