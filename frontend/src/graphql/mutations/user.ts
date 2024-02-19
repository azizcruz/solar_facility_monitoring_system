import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation ($input: UserLoginInput!) {
    userLogin(input: $input) {
      token
    }
  }
`;
