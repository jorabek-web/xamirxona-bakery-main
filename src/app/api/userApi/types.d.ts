import { ROLES } from "../../../constants";

interface Session {
  _id: string;
  userAgent: string;
  ip: string;
  approved: boolean;
  createdAt: string;
}

interface User {
  balance: number;
  _id: string;
  role: string;
  status: number;
  branch: string;
  fullName: string;
  avatar: string;
  username: string;
  supplierProducts: Record<string, unknown>;
  sessions: Session[];
  createdAt: string;
  updatedAt: string;
  doughroom: string;
  breadPrices: any[];
}

export type GetUserByIdRequest = string;
export type GetUserByIdResponse = User;

export type GetUserRequest = {};
export interface GetUserResponse extends User {
  user?: string;
  role?: string;
  message?: string;
  salaryBalance?: string;
}

export type GetAllUsersResponse = User[];
export type GetAllUsersRequest = {
  roles: ROLES[];
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export type ChangePasswordResponse = {};

export type UpdateUserRequest = {
  id: string;
  fullName?: string;
  username?: string;
  password?: string;
  avatar?: string;
};
export type UpdateUserResponse = {};

export type UpdateUserAvatarRequest = {
  avatar: string;
};

export type UpdateUserAvatarResponse = {};
