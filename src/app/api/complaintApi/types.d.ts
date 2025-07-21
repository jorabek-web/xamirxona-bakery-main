import { User } from "../userApi/types";

export type GetAllComplaintsRequest = {};
export interface GetAllComplaintsResponse {
  _id: string;
  from: User;
  to: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetComplaintRequest {
  id: string;
}
export interface GetComplaintResponse {
  [];
}

export type GetComplainMessageResponse = {
  from: string;
  to: string;
  content: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
export type GetComplainMessageRequest = {
  to: string;
  content: string;
};
