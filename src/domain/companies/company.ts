import { BaseEntity } from "!domain/base/base";
import { User } from "!domain/users/user";

interface ConstructorProps {
  name: string;
  website: string;
  cnpj: string;
  user: User;
}

export class Company extends BaseEntity {
  private _name: string;
  private _website: string;
  private _cnpj: string;
  private _user: User;

  constructor(props: ConstructorProps) {
    super();
    this._name = props.name;
    this._website = props.website;
    this._cnpj = props.cnpj;
    this._user = props.user;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  set website(website: string) {
    this._website = website;
  }

  get website(): string {
    return this._website;
  }

  set cnpj(cnpj: string) {
    this._cnpj = cnpj;
  }

  get cnpj(): string {
    return this._cnpj;
  }

  set user(user: User) {
    this._user = user;
  }

  get user(): User {
    return this._user;
  }
}
