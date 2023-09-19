import { Company } from "!domain/companies/company";
import { Place } from "!domain/places/place";
import { User } from "!domain/users/user";

describe("Company entity test", () => {
  it("should be able to create a new place object", () => {
    const place = new Place({
      name: "place",
      street: "street",
      state: "state",
      number: "15",
      district: "center",
      city: "city",
      cep: "cep",
      company: new Company({
        name: "MyCompany",
        website: "http://my.company.com",
        cnpj: "80.562.961/0001-29",
        user: new User({
          name: "John Doe",
          email: "john@doe.com",
          password: "my-secret-password",
        }),
      }),
    });

    expect(place).toBeDefined();
    expect(place).toHaveProperty("id");
  });
});
