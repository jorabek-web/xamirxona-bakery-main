import { API_TAGS } from "../../../constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  GetAllExpensesRequest,
  GetAllExpensesResponse,
  GetExpenseRequest,
  GetExpenseResponse,
} from "./types";

export const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpeses: builder.query<
      GetAllExpensesResponse[],
      GetAllExpensesRequest
    >({
      query: () => ({
        url: PATHS.ALL,
        method: "GET",
      }),
      providesTags: [API_TAGS.EXPENSE]
    }),
    getExpense: builder.query<GetExpenseResponse, GetExpenseRequest>({
      query: ({ id }) => ({
        url: PATHS.EXPENSE_ID + id,
        method: "GET",
      }),
      providesTags: [API_TAGS.EXPENSE]
    }),
  }),
});

export const { useGetAllExpesesQuery, useGetExpenseQuery } = expenseApi;
