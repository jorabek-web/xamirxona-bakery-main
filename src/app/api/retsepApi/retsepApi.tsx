import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  GetAllRetsepsRequest,
  GetAllRetsepsResponse,
  GetRetsepRequest,
  GetRetsepResponse,
} from "./types";

export const retsepApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRetseps: builder.query<GetAllRetsepsResponse[], GetAllRetsepsRequest>(
      {
        query: () => ({
          url: PATHS.ALL,
          method: "GET",
        }),
      }
    ),
    getRetsep: builder.query<GetRetsepResponse, GetRetsepRequest>({
      query: ({ id }) => ({
        url: PATHS.RETSEPT_ID + id,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllRetsepsQuery, useGetRetsepQuery } = retsepApi;
