import { mergeResolvers } from "@graphql-tools/merge";
import facilityResolvers from "./FacilityResolvers.js";
import userResolvers from "./UserResolvers.js";

const mergedResolvers = mergeResolvers([facilityResolvers, userResolvers]);

export default mergedResolvers;
