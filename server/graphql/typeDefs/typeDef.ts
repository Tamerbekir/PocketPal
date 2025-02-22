import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
    getActivity(id: ID!): Activity
    getAllUsers: [User!]!
    getAllActivities: [Activity!]!
  }

  type User {
    id: ID!
    username: String!
    # password: String! # only for testing will delete. DO not want to display hashed password
    activities: [Activity!]!
  }

  type Activity {
    id: ID!
    name: String!
    value: Int!
    user: User!
  }

  type AuthUser {
    user: User
    token: String
  }
  
  type Mutation {
    createUser(username: String!, password: String!): User
    createActivity(name: String!, value: Int!, userId: ID!): Activity
    login(username: String!, password: String!): AuthUser
  }
  `
