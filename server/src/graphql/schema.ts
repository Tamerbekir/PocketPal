import { gql } from "apollo-server-express";

const typeDefs = gql`
  # Querying the user, and arrays for activities, todos, and journals
  type Query {
    id: ID!
    getUser: User
    getActivities: [Activity]
    getTodos: [Todo]
    getJournals: [Journal]
  }

  # query users id and email. NOT password (hashed)
  type User {
    id: ID!
    email: String
  }

  # query JWT token for user auth as well as the user
  type AuthPayload {
    token: String!
    user: User!
  }

  # all activity info
  type Activity {
    id: ID!
    # user: User!
    name: String!
    trackingUnit: String!
    startAmount: Int!
    expirationDate: String
    # Querying the associated info with Activity
    logs: [LogEntry]
  }

  # associated with Activity
  type LogEntry {
    amountUsed: Int!
    dateUsed: String!
    description: String
  }

  type Todo {
    id: ID!
    text: String!
    description: String
    completed: Boolean!
    date: String
  }

  type Journal {
    id: ID!
    text: String!
    date: String!
  }

  type Mutation {
    register(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addActivity(
      name: String
      trackingUnit: String!
      startAmount: Int!
      expirationDate: String!
    ): Activity
    addTodo(text: String!, description: String, date: String): Todo
    addJournal(text: String!, date: String!): Journal
  }
`;

export default typeDefs;
