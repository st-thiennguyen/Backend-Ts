import bcrypt from "bcrypt";

const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 8);
};

const isPasswordMatch = async (inputPassword: string, password: string) => {
  return bcrypt.compare(inputPassword, password);
};

export { encryptPassword, isPasswordMatch };
