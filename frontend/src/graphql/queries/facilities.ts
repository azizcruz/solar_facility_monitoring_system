import { gql } from "@apollo/client";

export const GET_FACILITY = gql`
  query ($facilityId: ID!) {
    facility(id: $facilityId) {
      pv_metrics {
        activePowerKW
        energyKWh
        timestamp
      }
    }
  }
`;

export const MY_FACILITIES = gql`
  query {
    myFacilities {
      _id
      name
      latitude
      longitude
    }
  }
`;
