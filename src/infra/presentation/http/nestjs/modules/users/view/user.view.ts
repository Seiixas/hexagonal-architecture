import { User } from "!domain/users/user";
import { CompanyView } from "../../companies/view/company.view";

export class UserView {
  public static ToView(user: User) {
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
