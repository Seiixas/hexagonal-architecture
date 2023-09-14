import { User } from "!domain/users/user";
import { Company } from "./company";

describe("Company entity test", () => {
  it("should be able to create a new company object", () => {
    const company = new Company({
      name: "MyCompany",
      website: "http://my.company.com",
      cnpj: "80.562.961/0001-29",
      user: new User({
        name: "John Doe",
        email: "john@doe.com",
        password: "my-secret-password",
      }),
    });

    expect(company).toBeDefined();
    expect(company).toHaveProperty("id");
  });
});
