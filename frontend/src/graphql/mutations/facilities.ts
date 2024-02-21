import { gql } from "@apollo/client";

export const CREATE_FACILITY = gql`
  mutation ($input: CreateFacilityInput!) {
    createFacility(input: $input) {
      name
      _id
      latitude
      longitude
    }
  }
`;

export const UPDATE_FACILITY = gql`
  mutation ($input: UpdateFacilityInput!) {
    updateFacility(input: $input) {
      _id
      name
      longitude
      latitude
    }
  }
`;

export const DELETE_FACILITY = gql`
  mutation ($deleteFacilityId: ID!) {
    deleteFacility(id: $deleteFacilityId) {
      message
    }
  }
`;

export const UPLOAD_FACILITY_PVMETRICS = gql`
  mutation ($facilityId: ID!, $upload: Upload!) {
    uploadPVMetricsToFacility(facilityId: $facilityId, upload: $upload) {
      pv_metrics {
        activePowerKW
        energyKWh
        timestamp
      }
    }
  }
`;
