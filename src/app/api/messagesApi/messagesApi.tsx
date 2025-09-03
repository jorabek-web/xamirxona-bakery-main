import { API_TAGS } from "../../../constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  GetAllMessagesRequest,
  GetAllMessagesResponse,
  GetMessageRequest,
  GetMessageResponse,
  PostMessageRequest,
  PostMessageResponse,
  ReadMessageRequest,
  ReadMessageResponse,
} from "./types";

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessages: builder.query<
      GetAllMessagesResponse,
      GetAllMessagesRequest
    >({
      query: () => ({
        url: PATHS.ALL,
        method: "GET",
      }),
      providesTags: [API_TAGS.MESSAGE],
    }),
    getMessage: builder.query<GetMessageResponse, GetMessageRequest>({
      query: (id) => ({
        url: `${PATHS.MESSAGE_ID}${id}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.MESSAGE],
    }),
    postMessage: builder.mutation<PostMessageResponse, PostMessageRequest>({
      query: (body) => ({
        url: PATHS.ADD,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [API_TAGS.MESSAGE],
    }),
    readMessage: builder.mutation<ReadMessageResponse, ReadMessageRequest>({
      query: ({ idUser, idMsg }) => ({
        url: `${PATHS.READ}${idUser}/${idMsg}`,
        method: "PATCH",
      }),
      invalidatesTags: [API_TAGS.MESSAGE],
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useGetMessageQuery,
  usePostMessageMutation,
  useReadMessageMutation,
} = messagesApi;
