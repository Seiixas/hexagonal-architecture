import { Company } from "!domain/companies/company";
import { BaseEntity } from "../base/base";

interface ConstructorProps {
  name: string;
  email: string;
  password: string;
}

export class User extends BaseEntity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _companies: Company[];

  constructor(props: ConstructorProps) {
    super();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
  }

  get name(): string {
    return this._name;
  }

  set email(email: string) {
    this._updatedAt = new Date();
    this._email = email;
  }

  get email(): string {
    return this._email;
  }

  set password(password: string) {
    this._updatedAt = new Date();
    this._password = password;
  }

  get password(): string {
    return this._password;
  }

  set name(name: string) {
    this._updatedAt = new Date();
    this._name = name;
  }

  get companies(): Company[] {
    return this._companies;
  }

  set companies(company: Company[]) {
    this._companies = company;
  }
}
