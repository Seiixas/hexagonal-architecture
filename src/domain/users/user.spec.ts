import { User } from "./user";

describe("User entity test", () => {
  it("should be able to create a new user object", () => {
    const user = new User({
      name: "John Doe",
      email: "john@doe.com",
      password: "my-secret-password",
    });

    expect(user).toBeDefined();
    expect(user).toHaveProperty("id");
  });
});
