import { validateEmail, validatePassword } from "../../utils";

describe("validateEmail", () => {
  it("returns true when the email is valid", () => {
    const email = "test@test.com";

    const result = validateEmail(email);

    expect(result).toBe(true);
  });

  it("returns false when the email is invalid", () => {
    const email = "test.com";

    const result = validateEmail(email);

    expect(result).toBe(false);
  });

  it("returns false when the email is empty", () => {
    const email = "";

    const result = validateEmail(email);

    expect(result).toBe(false);
  });
});

describe("validatePassword", () => {
  it("returns true when the password has at least one capital letter, one numeric character, and one special character", () => {
    const password = "Password1!";

    const result = validatePassword(password);

    expect(result).toBe(true);
  });

  it("returns false when the password hasn't at least one capital letter, one numeric character, and one special character", () => {
    const password = "password";

    const result = validatePassword(password);

    expect(result).toBe(false);
  });

  it("returns false when the password is empty", () => {
    const password = "";

    const result = validatePassword(password);

    expect(result).toBe(false);
  });
});
