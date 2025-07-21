import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import { GetAllMessagesRequest, GetAllMessagesResponse, GetMessageRequest, GetMessageResponse, PostMessageRequest, PostMessageResponse } from "./types";

export const messagesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMessages: builder.query<GetAllMessagesResponse, GetAllMessagesRequest>({
            query: () => ({
                url: PATHS.ALL,
                method: 'GET',
            }),
        }),
        getMessage: builder.query<GetMessageResponse, GetMessageRequest> ({
            query: (id) => ({
                url: `${PATHS.MESSAGE_ID}${id}`,
                method: 'GET',
            })
        }),
        postMessage: builder.mutation<PostMessageResponse, PostMessageRequest >({
            query:(body) => ({
                url:PATHS.ADD,
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    }),
})

export const { useGetAllMessagesQuery, useGetMessageQuery, usePostMessageMutation } = messagesApi;