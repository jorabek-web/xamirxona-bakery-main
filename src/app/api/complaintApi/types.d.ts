import { User } from "../userApi/types";

interface FroAndTomUser {
  _id: string;
  role: string;
  fullName: string;
}

interface Complaint {}

export type GetAllComplaintsRequest = {};
export interface GetAllComplaintsResponse {
  _id: string;
  from: FroAndTomUser;
  to: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type GetMyComplaintsRequest = {};
export interface GetMyComplaintsResponse {
  _id: string;
  from: string;
  to: FroAndTomUser;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetComplaintRequest {
  id: string;
}
export interface GetComplaintResponse extends Complaint {}

export type GetComplainMessageResponse = {
  from: string;
  to: string;
  content: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
export type GetComplainMessageRequest = {
  content: string;
  to: string;
};
