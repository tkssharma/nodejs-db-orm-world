import * as argon2 from 'argon2';

export const hashPassword = async (passowrd: string) => {
  const hashed = await argon2.hash(passowrd);
  return hashed;
};

export const comparePassowrd = async (
  hashedPassword: string,
  password: string
) => {
  return await argon2.verify(hashedPassword, password);
};
