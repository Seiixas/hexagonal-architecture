import { BaseEntity } from "!domain/base/base";
import { User } from "!domain/users/user";
import { Place } from "@prisma/client";

interface ConstructorProps {
  id?: string;
  name: string;
  website: string;
  cnpj: string;
  user?: User;
  places?: Place[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Company extends BaseEntity {
  private _name: string;
  private _website: string;
  private _cnpj: string;
  private _user: User | null;
  private _places: Place[] | null;

  constructor(props: ConstructorProps) {
    super({
      id: props.id,
      updatedAt: props.updatedAt,
      createdAt: props.createdAt,
    });
    this._name = props.name;
    this._website = props.website;
    this._cnpj = props.cnpj;
    this._user = props.user ?? null;
    this._places = props.places ?? null;
  }

  public get name(): string {
    return this._name;
  }

  public get website(): string {
    return this._website;
  }

  public get cnpj(): string {
    return this._cnpj;
  }

  public get user(): User {
    return this._user;
  }

  public get places(): Place[] {
    return this._places;
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

  public set user(value: User) {
    this._user = value;
  }

  public set places(value: Place[]) {
    this._places = value;
  }
}
