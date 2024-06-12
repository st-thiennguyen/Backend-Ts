import bcrypt from "bcrypt";

const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 8);
};

const isPasswordMatch = async (password: string, inputPassword: string) => {
  return bcrypt.compare(password, inputPassword);
};

export { encryptPassword, isPasswordMatch };
