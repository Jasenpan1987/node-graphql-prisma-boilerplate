import "cross-fetch/polyfill";
import prisma from "../src/prisma";
import seedDatabase, { userOne } from "./utils/seedDatabase";
import getClient from "./utils/getClient";
import { createUser, login, getUsers, getProfile } from "./utils/operations";
const client = getClient();

beforeEach(async () => {
  await seedDatabase("user");
});

xtest("Should create a new user", async () => {
  const data = {
    name: "Billy doe",
    email: "testbilly@qq.com",
    password: "abc123"
  };

  const response = await client.mutate({
    mutation: createUser,
    variables: { data }
  });

  const userExist = await prisma.exists.User({
    id: response.data.createUser.user.id
  });
  expect(userExist).toBe(true);
});

xtest("Should expose public author profiles", async () => {
  const response = await client.query({
    query: getUsers
  });

  const users = response.data.users;

  expect(users.length).toBe(1);
  expect(users[0].email).toBe(null);
  expect(users[0].name).toBe("Jasen Test");
});

xtest("Should not login with bad credentials", async () => {
  const data = { email: "aaa@qq.com", password: "1234" };
  await expect(
    client.mutate({ mutation: login, variables: { data } })
  ).rejects.toThrow();
});

xtest("Should fetch user profile", async () => {
  const client = getClient(userOne.jwt);
  const {
    data: { me }
  } = await client.query({ query: getProfile });
  expect(me.name).toBe(userOne.user.name);
  expect(me.email).toBe(userOne.user.email);
});
