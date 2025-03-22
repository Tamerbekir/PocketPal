import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Activity from "../models/Activity";
import Todo from "../models/Todo";
import Journal from "../models/Journal";
import { query } from "express";
import { GraphQLContext } from "../types/context";
import { register } from "module";

const resolvers = {
  Query: {
    getUser: (__: any, any: any, context: GraphQLContext) => context.user,
    getActivities: (__: any, any: any, context: GraphQLContext) => {
      if (!context.user) {
        throw new Error("User not authenticated");
      } else {
        return Activity.find({ user: context.user.id });
      }
    },

    getTodos: (__: any, any: any, context: GraphQLContext) => {
      if (!context.user) {
        throw new Error("User not authenticated");
      } else {
        return Todo.find({ user: context.user.id });
      }
    },

    getJournals: (__: any, any: any, context: GraphQLContext) => {
      if (!context.user) {
        throw new Error("User not authenticated");
      } else {
        return Journal.find({ user: context.user.id });
      }
    },
  },

  Mutation: {
    Mutation: {
      register: async (
        _: any,
        { email, password }: { email: string; password: string }
      ) => {
        try {
          const user = new User({ email, password }); // No need to hash manually
          await user.save(); // Hashing happens in the model

          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            {
              expiresIn: "1h",
            }
          );

          return { token, user };
        } catch (error) {
          throw new Error("Error registering user: " + error.message);
        }
      },

      login: async (
        _: any,
        { email, password }: { email: string; password: string }
      ) => {
        const user = (await User.findOne({ email })) as IUser | null; // Ensure TypeScript knows it's an IUser
        if (!user || !(await user.matchPassword(password))) {
          throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET!,
          {
            expiresIn: "1h",
          }
        );

        return { token, user };
      },
    },
  },
};
