import { FacilityType } from "./Facility";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  facilitis: FacilityType[];
};
