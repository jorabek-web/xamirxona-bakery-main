import { API_TAGS } from "../../../constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  GetAllBakeriesRequest,
  GetAllBakeriesResponse,
  GetBakeryhRequest,
  GetBakeryResponse,
} from "./types";

export const bakeryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBakeries: builder.query<
      GetAllBakeriesResponse,
      GetAllBakeriesRequest
    >({
      query: () => ({
        url: PATHS.ALL,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    getBakery: builder.query<GetBakeryResponse, GetBakeryhRequest>({
      query: ({ id }) => ({
        url: PATHS.BAKERY_ID + id,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    // getBakeryDoughs: builder.query<GetAllBakeryDoughsResponse[], GetAllBakeryDoughsRequest>({
    //     query: () => ({
    //         url: PATHS.BAKERY_DOUGHS,
    //         method: 'GET',
    //     }),
    // providesTags: [API_TAGS.BAKERY],
    // }),
  }),
});

export const {
  useGetAllBakeriesQuery,
  useGetBakeryQuery,
  // useGetBakeryDoughsQuery
} = bakeryApi;
