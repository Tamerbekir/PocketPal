import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
    # getActivity(id: ID!): Activity
    getAllUsers: [User!]!
    # getAllActivities: [Activity!]!
  }

  type User {
    id: ID!
    username: String!
    # password: String! # only for testing will delete. DO not want to display hashed password
    activities: [Activity!]!
  }


  type AuthUser {
    user: User
    token: String
  }
  
  type Mutation {
  createUser(username: String!, password: String!): AuthUser
  login(username: String!, password: String!): AuthUser
}

  `
