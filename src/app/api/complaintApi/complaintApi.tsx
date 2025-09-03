import { API_TAGS } from "../../../constants/ApiTags";
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
      providesTags: [API_TAGS.COMPLAINT],
    }),

    getMyComplaints: builder.query<
      GetMyComplaintsResponse[],
      GetMyComplaintsRequest
    >({
      query: () => ({
        url: PATHS.MY_COMPLAINTS,
        method: "GET",
      }),
      providesTags: [API_TAGS.COMPLAINT],
    }),

    getComplaint: builder.query<GetComplaintResponse, GetComplaintRequest>({
      query: ({ id }) => ({
        url: PATHS.COMPLAINT_ID + id,
        method: "GET",
      }),
      providesTags: [API_TAGS.COMPLAINT],
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
      invalidatesTags: [API_TAGS.COMPLAINT],
    }),
  }),
});

export const {
  useGetAllComplaintsQuery,
  useGetComplaintQuery,
  useGetMyComplaintsQuery,
  usePostComplaintMessageMutation,
} = complaintApi;
