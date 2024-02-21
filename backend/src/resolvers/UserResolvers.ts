import { User, UserDocument } from "../models/user.js";
import { z } from "zod";
import { Token } from "../types/Commons.js";
import { GraphQLError } from "graphql";
import {
  ALREADY_EXISTS,
  BAD_USER_INPUT,
  NOT_FOUND,
} from "../constants/statusMessages.js";
import { generateToken } from "../utils/generateToken.js";
import dotenv from "dotenv";
import { Facility } from "../models/facility.js";

dotenv.config();

const userResolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      return User.findById(context?.userId);
    },
  },

  User: {
    facilities: async (parent: UserDocument) => {
      return Facility.find({ user: parent._id });
    },
  },

  Mutation: {
    createUser: async (_, args, _context): Promise<Token> => {
      const createUserInputSchema = z.object({
        email: z.string().email(),
        password: z.string().min(3),
      });

      const { email, password } = createUserInputSchema.parse(args.input);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new GraphQLError(ALREADY_EXISTS, {
          extensions: {
            code: ALREADY_EXISTS,
          },
        });
      }

      const user = new User({
        email,
        password,
      });

      await user.save();

      const token: string = generateToken(user._id);

      return { token };
    },
    userLogin: async (_, args, _context): Promise<Token> => {
      const userLoginInputSchema = z.object({
        email: z.string().email(),
        password: z.string(),
      });

      const { email, password } = userLoginInputSchema.parse(args.input);

      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError(NOT_FOUND);
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new GraphQLError("Incorrect password or email");
      }

      const token = generateToken(user._id);

      return { token };
    },
    userLogout: async (_, _args, context) => {
      context.user = null;
      return { message: "User logged out successfully" };
    },
  },
};

export default userResolvers;
