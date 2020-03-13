import { gql } from "apollo-boost";

// users
const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      user {
        name
        password
        email
        id
      }
      token
    }
  }
`;

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;

const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

export { createUser, getUsers, login, getProfile };
