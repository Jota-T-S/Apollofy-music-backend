import bcrypt from 'bcrypt';

export const matchPassword = async (
  password: string,
  savedPassword: string
) => {
  return await bcrypt.compare(password, savedPassword);
};
