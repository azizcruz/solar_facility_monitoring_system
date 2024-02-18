import gql from "graphql-tag";

const pvMetricTypeDefs = gql`
  type PVMetric {
    _id: ID!
    activePowerKW: Float!
    energyKWh: Float!
    timestamp: String!
    facility: String!
  }
`;

export { pvMetricTypeDefs };
