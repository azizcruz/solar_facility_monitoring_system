import { commonTypeDefs } from "./CommonsDefs.js";
import { facilityTypeDefs } from "./FacilityTypeDefs.js";
import { userTypeDefs } from "./UserTypeDefs.js";
import { pvMetricTypeDefs } from "./PVMetricType.js";
import { mergeTypeDefs } from "@graphql-tools/merge";

const mergedTypeDefs = mergeTypeDefs([
  commonTypeDefs,
  pvMetricTypeDefs,
  facilityTypeDefs,
  userTypeDefs,
]);

export default mergedTypeDefs;
