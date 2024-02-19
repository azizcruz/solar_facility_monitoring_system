import gql from "graphql-tag";

const userTypeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    facilities: [Facility]
    createdAt: String!
    updatedAt: String!
  }

  type Token {
    token: String!
  }

  input CreateUserInput {
    email: String!
    password: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    createUser(input: CreateUserInput!): Token
    userLogout: ResponseMessage
    userLogin(input: UserLoginInput!): Token
  }
`;

export { userTypeDefs };
