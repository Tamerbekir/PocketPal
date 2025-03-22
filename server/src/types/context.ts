import { Request } from "express";

export interface UserType {
  id: string;
  email: string;
}

export interface ActivityType {
  id: string;
  name: string;
  trackingUnit: string;
  startAmount: number;
  expirationDate: string;
  userId: string;
}

export interface JournalType {
  id: string;
  text: string;
  date: string;
  userId: string;
}

export interface TodoType {
  id: string;
  text: string;
  date: string;
  description: string;
  completed: boolean;
  userId: string;
}

export interface GraphQLContext {
  user?: UserType;
  // tod o: TodoType;
  // activity: ActivityType;
  // journal: JournalType;
  req: Request;
}
