import gql from "graphql-tag";

const facilityTypeDefs = gql`
  type Facility {
    _id: ID!
    name: String!
    latitude: Float!
    longitude: Float!
    createdAt: String!
    updatedAt: String!
    user: String
  }

  input CreateFacilityInput {
    name: String!
    latitude: Float!
    longitude: Float!
  }

  input UpdateFacilityInput {
    id: ID!
    name: String
    latitude: Float
    longitude: Float
  }

  type Query {
    myFacilities: [Facility!]
  }

  type Mutation {
    updateFacility(input: UpdateFacilityInput!): Facility
    createFacility(input: CreateFacilityInput!): Facility
    deleteFacility(id: ID!): ResponseMessage
  }
`;

export { facilityTypeDefs };
