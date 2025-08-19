import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  GetMoneyAccruedRequest,
  GetMoneyAccruedResponse,
  GetMoneyReceivedRequest,
  GetMoneyReceivedResponse,
  UpdateRefundRequest,
  UpdateRefundResponse,
} from "./types";

export const salariesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMoneyReceived: builder.query<
      GetMoneyReceivedResponse[],
      GetMoneyReceivedRequest
    >({
      query: ({ id }) => ({
        url: PATHS.RECEIVED_MONEY + id,
        method: "GET",
      }),
      providesTags: ["salaries"],
    }),
    getMoneyAccrued: builder.query<
      GetMoneyAccruedResponse[],
      GetMoneyAccruedRequest
    >({
      query: ({ id }) => ({
        url: PATHS.ACCRUED_MONEY + id,
        method: "GET",
      }),
      providesTags: ["salaries"],
    }),
    updateRefund: builder.mutation<UpdateRefundResponse, UpdateRefundRequest>({
      query: ({ id, amount }) => ({
        url: PATHS.REFUND + id,
        method: "PATCH",
        body: { amount },
      }),
      invalidatesTags: ["salaries"],
    }),
  }),
});

export const {
  useGetMoneyReceivedQuery,
  useGetMoneyAccruedQuery,
  useUpdateRefundMutation,
} = salariesApi;
