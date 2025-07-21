import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  DeleteDoughRequest,
  DeleteDoughResponse,
  GetAllDoughroomsRequest,
  GetAllDoughroomsResponse,
  GetByIdDoughroomRequest,
  GetByIdDoughroomResponse,
  GetDoughsRequest,
  GetDoughsResponse,
  GetStockReponse,
  GetStockRequest,
  PostDoughroomsRequest,
  PostDoughroomsResponse,
  ReadyDoughRequest,
  ReadyDoughResponse,
  SendToDoughRequest,
  SendToDoughResponse,
} from "./types";

export const doughroomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoughrooms: builder.query<
      GetAllDoughroomsResponse,
      GetAllDoughroomsRequest
    >({
      query: () => ({
        url: PATHS.ALL,
        method: "GET",
      }),
      providesTags: ["doughroom"],
    }),

    getByIdDoughroom: builder.query<
      GetByIdDoughroomResponse,
      GetByIdDoughroomRequest
    >({
      query: ({ id }) => ({
        url: PATHS.DOUGHROOM_ID + id,
        method: "GET",
      }),
      providesTags: ["doughroom"],
    }),

    getDoughs: builder.query<GetDoughsResponse[], GetDoughsRequest>({
      query: ({ id, date }) => ({
        url: PATHS.DOUGHS + id,
        params: { date },
      }),
      providesTags: ["doughroom"],
    }),

    postDough: builder.mutation<PostDoughroomsResponse, PostDoughroomsRequest>({
      query: (body) => ({
        url: PATHS.POST,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["doughroom"],
    }),

    readyDough: builder.mutation<ReadyDoughResponse, ReadyDoughRequest>({
      query: ({ id }) => ({
        url: PATHS.UPDATE + id + PATHS.READY,
        method: "PATCH",
      }),
      invalidatesTags: ["doughroom"],
    }),

    deleteDough: builder.mutation<DeleteDoughResponse, DeleteDoughRequest>({
      query: ({ id }) => ({
        url: PATHS.UPDATE + id,
        method: "DELETE",
      }),
      invalidatesTags: ["doughroom"],
    }),

    getStock: builder.query<GetStockReponse, GetStockRequest>({
      query: ({ id }) => ({
        url: PATHS.DOUGHROOM_ID + id,
        method: "GET",
      }),
      providesTags: ["doughroom"],
    }),

    sendToDough: builder.mutation<SendToDoughResponse, SendToDoughRequest>({
      query: ({ id, send_to_baker_room }) => ({
        url: PATHS.UPDATE + id + PATHS.SEND_TO_BAKER_ROOM,
        method: "PATCH",
        body: { send_to_baker_room },
      }),
      invalidatesTags: ["doughroom"],
    }),
  }),
});

export const {
  useGetAllDoughroomsQuery,
  useGetByIdDoughroomQuery,
  usePostDoughMutation,
  useDeleteDoughMutation,
  useGetDoughsQuery,
  useGetStockQuery,
  useReadyDoughMutation,
  useSendToDoughMutation,
} = doughroomApi;
