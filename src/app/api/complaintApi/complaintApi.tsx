import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  GetAllComplaintsRequest,
  GetAllComplaintsResponse,
  GetComplainMessageRequest,
  GetComplainMessageResponse,
  GetComplaintRequest,
  GetComplaintResponse,
  GetMyComplaintsRequest,
  GetMyComplaintsResponse,
} from "./types";

export const complaintApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComplaints: builder.query<
      GetAllComplaintsResponse[],
      GetAllComplaintsRequest
    >({
      query: () => ({
        url: PATHS.ALL,
        method: "GET",
      }),
      providesTags: ["complaint"],
    }),

    getMyComplaints: builder.query<
      GetMyComplaintsResponse[],
      GetMyComplaintsRequest
    >({
      query: () => ({
        url: PATHS.MY_COMPLAINTS,
        method: "GET",
      }),
      providesTags: ["complaint"],
    }),

    getComplaint: builder.query<GetComplaintResponse, GetComplaintRequest>({
      query: ({ id }) => ({
        url: PATHS.COMPLAINT_ID + id,
        method: "GET",
      }),
      providesTags: ["complaint"],
    }),

    postComplaintMessage: builder.mutation<
      GetComplainMessageResponse,
      GetComplainMessageRequest
    >({
      query: (body) => ({
        url: PATHS.POST,
        method: "POST",
        body,
      }),
      invalidatesTags: ["complaint"],
    }),
  }),
});

export const {
  useGetAllComplaintsQuery,
  useGetComplaintQuery,
  useGetMyComplaintsQuery,
  usePostComplaintMessageMutation,
} = complaintApi;
