import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import { GetAllBakeriesRequest, GetAllBakeriesResponse, GetBakeryhRequest, GetBakeryResponse } from "./types";

export const bakeryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBakeries: builder.query<GetAllBakeriesResponse, GetAllBakeriesRequest>({
            query: () => ({
                url: PATHS.ALL,
                method: 'GET',
            }),
        }),
        getBakery: builder.query<GetBakeryResponse, GetBakeryhRequest>({
            query: ({ id }) => ({
                url: PATHS.BAKERY_ID + id,
                method: 'GET',
            }),
        }),
        // getBakeryDoughs: builder.query<GetAllBakeryDoughsResponse[], GetAllBakeryDoughsRequest>({
        //     query: () => ({
        //         url: PATHS.BAKERY_DOUGHS,
        //         method: 'GET',
        //     }),
        // }),
    }),
})

export const {
    useGetAllBakeriesQuery,
    useGetBakeryQuery,
    // useGetBakeryDoughsQuery
} = bakeryApi;