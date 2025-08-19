import { ROLES, Status, StatusNo, Type } from "../../../constants";
import { PostDoughroomsResponse } from "../doughroomApi/types";

export interface NotificationUser {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  branch: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  debt: number;
}

export interface GetNotificationRequest {
  id: string;
}

export interface GetNotificationResponse {
  _id: string;
  title: string;
  branch: string;
  body: string;
  from: string;
  toUser: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllNotificationsRequest {
  id: string;
}

interface Ingredient {
  _id: string;
  title: string;
  scope: string;
}

export interface GetAllNotificationsResponse {
  _id: string;
  warehouseIngredientId: string;
  branchId: string;
  ingredient: Ingredient;
  doughRoomId: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateNotificationResponse {
  _id: string;
  type: Type;
  role?: ROLES;
  order?: string;
  users?: string[];
  expense?: string;
  report?: string;
  warehouse?: string;
  doughroom?: string;
  bakery?: string;
  doughs?: string[];
  delivery?: string;
}

export interface UpdateNotificationRequest {
  id?: string;
  body?: {
    status?: StatusNo;
  };
}
