import bcrypt from "bcryptjs";

const hashPassword = async password => {
  if (password && password.length < 3) {
    throw new Error("Password need to be 3 characters or longer.");
  }

  return await bcrypt.hash(password, 10);
};

export default hashPassword;
