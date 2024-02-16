import gql from "graphql-tag";

const commonTypeDefs = gql`
  type ResponseMessage {
    message: String!
  }
`;

export { commonTypeDefs };
