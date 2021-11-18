import { ValidatePasswordPipe } from "./validate-password.pipe";

describe("ValidatePasswosrdPipe", () => {
  it("should be defined", () => {
    expect(new ValidatePasswordPipe()).toBeDefined();
  });
});
