import prisma from "../../src/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let userOne = {
  input: {
    name: "Jasen Test",
    email: "test_jasen@qq.com",
    password: bcrypt.hashSync("abc123")
  },
  user: undefined,
  jwt: undefined
};

let userTwo = {
  input: {
    name: "John Test",
    email: "test_john@qq.com",
    password: bcrypt.hashSync("abc123")
  },
  user: undefined,
  jwt: undefined
};

const createSeedingUser = async () => {
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });

  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
};

const seedDatabase = async from => {
  await prisma.mutation.deleteManyUsers();

  await createSeedingUser();

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { userOne, userTwo };

export default seedDatabase;
