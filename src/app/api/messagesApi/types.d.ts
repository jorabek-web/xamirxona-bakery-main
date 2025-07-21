interface User {
    _id: string;
    avatar:string
    branch:string;
    createdAt:string;
    fullName:string;
    password:string
    role:string;
}
export interface GetAllMessagesRequest {}
export type GetAllMessagesResponse = {
    lastMessage: string
    chat: User;
}[]


export type GetMessageResponse = {
    _id: string;
    from: string;
    to: string;
    createdAt: string;
    content: string;
}[]

export type GetMessageRequest = string | undefined;

export type PostMessageRequest = {
    to: string;
    content: string;
}

export type PostMessageResponse = {[]}