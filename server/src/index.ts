import express from "express";
import { ApolloServer } from "apollo-server-express";
import connectDB from "./config/db";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { GraphQLContext, UserType } from "./types/context";

dotenv.config();
connectDB();

const PORT = 3001;
const app = express();

const getUserFromToken = (token: string): UserType | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as UserType;
  } catch {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }): GraphQLContext => {
    const token = req.headers.authorization;
    const user = token ? getUserFromToken(token.replace("bearer ", "")) : null;
    return { user, req };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(PORT, () =>
    console.log(`Server up and running on http://localhost:${PORT}/graphql`)
  );
}
