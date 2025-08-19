import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  GetAllNotificationsRequest,
  GetAllNotificationsResponse,
  GetNotificationRequest,
  GetNotificationResponse,
  UpdateNotificationRequest,
  UpdateNotificationResponse,
} from "./types";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<
      GetAllNotificationsResponse[],
      GetAllNotificationsRequest
    >({
      query: ({ id }) => ({
        url: PATHS.ALL + id,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    getNotifications: builder.query<
      GetNotificationResponse[],
      GetNotificationRequest
    >({
      query: ({ id }) => ({
        url: PATHS.NOTIFICATIONS_START + id + PATHS.NOTIFICATIONS_END,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    updateNotification: builder.mutation<
      UpdateNotificationResponse,
      UpdateNotificationRequest
    >({
      query: ({ id, body }) => ({
        url: PATHS.UPDATE + id + "/doughroom/" + body?.status,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationsQuery, useUpdateNotificationMutation, useGetNotificationsQuery } =
  notificationApi;
