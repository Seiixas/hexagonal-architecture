import { randomUUID } from "crypto";

interface ConstructorProps {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BaseEntity {
  protected _id: string;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  constructor(props?: ConstructorProps) {
    this._id = props && props.id ? props.id : randomUUID();
    this._createdAt = props && props.createdAt ? props.createdAt : new Date();
    this._updatedAt = props && props.updatedAt ? props.updatedAt : new Date();
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
