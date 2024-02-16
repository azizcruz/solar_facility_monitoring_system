import { FacilityType } from "./Facility";

export type PVMetricsType = {
  _id: string;
  activePowerKW: number;
  energyKWh: number;
  facility: FacilityType;
  timestamp: string;
};
