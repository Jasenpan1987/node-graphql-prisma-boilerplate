import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateAuthToken from "../utils/generateAuthToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  login: async (parent, { data: { email, password } }, { prisma }, info) => {
    const user = await prisma.query.user({ where: { email } }, undefined);
    if (!user) {
      throw new Error("Email or password not valid.");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Email or password not valid.");
    }
    return {
      user,
      token: generateAuthToken(user.id)
    };
  },
  createUser: async (parent, { data }, { prisma }, info) => {
    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.mutation.createUser(
      {
        data: { ...data, password: hashedPassword }
      },
      undefined
    );

    return {
      user,
      token: generateAuthToken(user.id)
    };
  },
  deleteUser: async (parent, args, { prisma, req }, info) => {
    const userId = getUserId(req);
    return await prisma.mutation.deleteUser({ where: { id: userId } }, info);
  },
  updateUser: async (parent, { data }, { prisma, req }, info) => {
    const userId = getUserId(req);

    const dataOptions = {
      ...data
    };
    if (typeof data.password === "string") {
      dataOptions.password = await hashPassword(data.password);
    }

    return await prisma.mutation.updateUser(
      {
        data: dataOptions,
        where: { id: userId }
      },
      info
    );
  }
};

export default Mutation;
