import { ROLES } from "../../../constants";
import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetAllUsersRequest,
  GetAllUsersResponse,
  GetUserByIdRequest,
  GetUserByIdResponse,
  GetUserRequest,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "./types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query<GetUserResponse, GetUserRequest>({
      query: () => ({
        url: PATHS.SINGLE_USER,
        method: "GET",
      }),
    }),
    getAllUsers: builder.query<GetAllUsersResponse, GetAllUsersRequest>({
      query: ({ roles }: { roles: ROLES[] }) => {
        const params = new URLSearchParams();
        roles.forEach((role) => params.append("roles", role));

        return {
          url: PATHS.ALL_USER,
          method: "GET",
          params,
        };
      },
    }),
    getUserById: builder.query<GetUserByIdResponse, GetUserByIdRequest>({
      query: (id) => ({
        url: PATHS.USER_ID + id,
        method: "GET",
      }),
    }),
    updateUserPassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: PATHS.USER_PASSWORD,
        method: "PATCH",
        body,
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (body) => ({
        url: PATHS.USER_ID + body.id,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserPasswordMutation,
  useUpdateUserMutation,
} = userApi;
