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

interface driver_type {
  status: string;
  _id: string;
  fullName: string;
  username: string;
  role: string;
  branch: string;
  balance: number;
  debt: number;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  subscription: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}

interface from_type {
  status: string;
  _id: string;
  fullName: string;
  username: string;
  role: string;
  branch: string;
  balance: number;
  debt: number;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  subscription: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}

interface doughroom_type {
  _id: string;
  branch: string;
  title: string;
  image: string;
  doughs: string[];
  warehouse: string[];
  createdAt: string;
  updatedAt: string;
}

interface ingradient_type {
  _id: string;
  branch: string;
  title: string;
  scope: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

interface warehouse_type {
  _id: string;
  ingradient: ingradient_type;
  count: number;
  cost: number;
  debt: number;
  from: string;
  createdAt: string;
  updatedAt: string;
}

interface dough_type {
  _id: string;
  doughroom: doughroom_type;
  status: string;
  createdAt: string;
  updatedAt: string;
  driver: driver_type;
}

export interface GetAllNotificationsResponse {
  _id: string;
  users: string;
  status: string;
  type: string;
  from: from_type;
  doughroom: {
    _id: string;
    branch: string;
    title: string;
    image: string;
    doughs: string[];
    warehouse: warehouse_type[];
    createdAt: string;
    updatedAt: string;
  };
  doughs: dough_type[];
  createdAt: string;
  updatedAt: string;
  warehouse: warehouse_type;
}

export interface GetNotificationRequest {
  id: string;
}

export interface GetNotificationResponse {
  [];
}

export interface PostNotificationRequest {
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

export interface PostNotificationResponse {
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

export interface PushNotificationRequest {
  id: string;
  body: {
    title: string;
    body?: string;
    data?: { url: string };
    vibrate: number[];
    actions: {
      action?: string;
      title?: string;
    }[];
  };
}

export interface UpdateNotificationRequest {
  id?: string;
  body?: {
    status?: StatusNo;
  };
}

export interface CreateNotificationRequest {
  endpoint?: string;
  keys?: {
    auth?: string;
    p256dh?: string;
  };
}
