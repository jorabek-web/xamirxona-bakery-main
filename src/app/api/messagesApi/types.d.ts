interface User {
  _id: string;
  avatar: string;
  username: string;
  fullName: string;
}

interface LastMessage {
  content: string;
  sender: string;
  createdAt: string;
}

export interface GetAllMessagesRequest {}
export type GetAllMessagesResponse = {
  user: User;
  lastMessage: LastMessage;
  unreadCount: number;
  lastMessageAt: string;
}[];

interface WithUser {
  _id: string;
  username: string;
  fullName: string;
}

interface Messages {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export type GetMessageResponse = {
  withUser: WithUser;
  messages: Messages[];
  lastMessage: string;
};

export type GetMessageRequest = string | undefined;

export type PostMessageRequest = {
  receiverId: string;
  content: string;
};

export type PostMessageResponse = { [] };

export type ReadMessageRequest = {
  idUser: string;
  idMsg: string;
};

export type ReadMessageResponse = {};
