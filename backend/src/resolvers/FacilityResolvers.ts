import { GraphQLError } from "graphql";
import { Facility, FacilityDocument } from "../models/facility.js";
import { ResponseMessage } from "../types/Commons.js";
import {
  ALREADY_EXISTS,
  BAD_USER_INPUT,
  FORBIDDEN,
  NOT_FOUND,
} from "../constants/statusMessages.js";
import { Document } from "mongoose";
import { User, UserDocument } from "../models/user.js";
import { z } from "zod";

const facilityResolvers = {
  Query: {
    myFacilities: async (_, _args, context): Promise<FacilityDocument[]> => {
      return Facility.find({ user: context.userId });
    },
  },

  Mutation: {
    createFacility: async (_, args, context): Promise<FacilityDocument> => {
      console.log(context);
      const createFacilityInputSchema = z.object({
        name: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      });

      const { name, latitude, longitude } = createFacilityInputSchema.parse(
        args.input
      );

      const facility: FacilityDocument = new Facility({
        name,
        latitude,
        longitude,
        user: context.userId,
      });

      const existingFacility = await Facility.findOne({
        name,
        latitude,
        longitude,
        user: context.userId,
      });

      if (existingFacility) {
        throw new GraphQLError(ALREADY_EXISTS, {
          extensions: {
            code: BAD_USER_INPUT,
            http: { status: 400 },
          },
        });
      }

      const user: UserDocument = await User.findById(context.userId);

      user.facilities = [...user.facilities, facility._id.toString()];
      user.save();

      return facility.save();
    },
    updateFacility: async (_, args, context): Promise<FacilityDocument> => {
      const updateFacilityInputSchema = z.object({
        id: z.string(),
        name: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      });

      const { id, name, latitude, longitude } = updateFacilityInputSchema.parse(
        args.input
      );

      const facility: FacilityDocument = await Facility.findById(id);

      if (!facility?.user || facility?.user != context.userId) {
        throw new GraphQLError(FORBIDDEN, {
          extensions: {
            code: FORBIDDEN,
            http: { status: 403 },
          },
        });
      }

      if (!facility) {
        throw new GraphQLError(NOT_FOUND, {
          extensions: {
            code: NOT_FOUND,
            http: { status: 404 },
          },
        });
      }
      facility.name = name;
      facility.latitude = latitude;
      facility.longitude = longitude;

      return facility.save();
    },
    deleteFacility: async (_, { id }, context): Promise<ResponseMessage> => {
      const facility = await Facility.findOne({ _id: id });

      if (!facility) {
        throw new GraphQLError(NOT_FOUND, {
          extensions: {
            code: NOT_FOUND,
            http: { status: 404 },
          },
        });
      }

      if (!facility?.user || facility?.user != context.userId) {
        throw new GraphQLError(FORBIDDEN, {
          extensions: {
            code: FORBIDDEN,
            http: { status: 403 },
          },
        });
      }
      await facility.deleteOne();
      return { message: "Facility deleted successfully" };
    },
  },
};

export default facilityResolvers;
