import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import { GetAllBranchesRequest, GetAllBranchesResponse, GetBranchRequest, GetBranchResponse } from "./types";

export const branchApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBranches: builder.query<GetAllBranchesResponse, GetAllBranchesRequest>({
            query: () => ({
                url: PATHS.ALL,
                method: 'GET',
            }),
        }),
        getBranch: builder.query<GetBranchResponse, GetBranchRequest>({
            query:({id}) => ({
                url:PATHS.BRANCH_ID + id,
                method: 'GET',
            }),
        }),
    }),
})

export const { 
    useGetAllBranchesQuery, 
    useGetBranchQuery,
} = branchApi;