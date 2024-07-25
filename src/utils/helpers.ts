import * as bycrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bycrypt.genSalt(10);
  return bycrypt.hash(password, salt);
};
