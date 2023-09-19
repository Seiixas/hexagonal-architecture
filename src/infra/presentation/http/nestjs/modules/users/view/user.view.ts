import { User } from "!domain/users/user";
import { CompanyToView, CompanyView } from "../../companies/view/company.view";

export interface UserToView {
  id: string;
  name: string;
  email: string;
  companies?: CompanyToView[];
  created_at: Date;
  updated_at: Date;
}
export class UserView {
  public static ToView(user: User): UserToView {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      ...(user.companies &&
        user.companies.map((company) => CompanyView.ToView(company))),
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }
}
