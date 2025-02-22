import { userResolver } from "./userResolvers";
import { activityResolver } from "./activityResolver";

export const resolvers = {
  Query: {
    ...userResolver.Query,
    ...activityResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...activityResolver.Mutation
  }
}