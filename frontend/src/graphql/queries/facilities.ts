import { gql } from "@apollo/client";

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
