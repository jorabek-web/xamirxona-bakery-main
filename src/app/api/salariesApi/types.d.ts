interface FromUser {
  _id: string;
  role: string;
  fullName: string;
}

export type GetMoneyReceivedRequest = {
  id: string;
};

export type GetMoneyReceivedResponse = {
  _id: string;
  amount: number;
  fromUser: FromUser;
  toUser: string;
  expenseId: string;
  totalAmount: number;
  status: number;
  branch: string;
  createdAt: string;
  updatedAt: string;
};

export interface GetMoneyAccruedRequest {
  id: string;
}

export interface GetMoneyAccruedResponse {
  _id: string;
  branch: string;
  amount: number;
  toUser: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateRefundRequest {
  id: string;
  amount: stirng;
}
export interface UpdateRefundResponse {}
