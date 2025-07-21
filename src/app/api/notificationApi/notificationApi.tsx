import { baseApi } from "../baseApi";
import { GetUserResponse } from "../userApi/types";
import { PATHS } from "./paths";
import {
  CreateNotificationRequest,
  GetAllNotificationsResponse,
  GetNotificationRequest,
  GetNotificationResponse,
  PostNotificationRequest,
  PostNotificationResponse,
  PushNotificationRequest,
  UpdateNotificationRequest,
} from "./types";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<GetAllNotificationsResponse[], void>({
      query: () => ({
        url: PATHS.ALL,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    getNotification: builder.query<
      GetNotificationResponse,
      GetNotificationRequest
    >({
      query: ({ id }) => ({
        url: PATHS.NOTIFICATION_ID + id,
        method: "GET",
      }),
    }),
    postNotification: builder.mutation<
      PostNotificationResponse,
      PostNotificationRequest
    >({
      query: (body) => ({
        url: PATHS.ALL,
        method: "POST",
        body,
      }),
      invalidatesTags: ["notification"],
    }),
    pushNotification: builder.mutation<void, PushNotificationRequest>({
      query: ({ body, id }) => ({
        url: PATHS.PUSHNOTIFICATION + id,
        method: "POST",
        body,
      }),
      invalidatesTags: ["notification"],
    }),
    updateNotification: builder.mutation<
      PostNotificationResponse,
      UpdateNotificationRequest
    >({
      query: ({ id, body }) => ({
        url: PATHS.UPDATENOTIFICATION + id + "/doughroom/" + body?.status,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
    createSubscribe: builder.mutation<
      GetUserResponse,
      CreateNotificationRequest
    >({
      query: (body) => ({
        url: PATHS.SUBSCRIBE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetNotificationQuery,
  usePostNotificationMutation,
  usePushNotificationMutation,
  useUpdateNotificationMutation,
  useCreateSubscribeMutation,
} = notificationApi;
