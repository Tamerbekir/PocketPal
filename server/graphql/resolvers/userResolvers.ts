import { Query } from "mongoose";
import User from "../../models/User";

import { verifyToken } from "../../utils/generateToken";

export const userResolvers = {
  Query: {
    async createUser(
      __: any,
      { username, password }: { username: string; password: string }
    ) {
      try {
        const newUser = new User({ username, password });
        await newUser.save();

        const token = verifyToken(newUser._id.toString());

        return { user: newUser, token };
      } catch (error) {
        console.error(error);
        throw new Error("There was an error creating a new user");
      }
    },
  },
};
