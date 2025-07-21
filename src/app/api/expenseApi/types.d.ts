import { User } from "../userApi/types";

export type GetAllExpensesRequest = {};
export type GetAllExpensesResponse = {
  amount: number;
  branch: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  _id: string;
};

export interface GetExpenseRequest {
  id: string;
}

export interface GetExpenseResponse {
  [];
}
