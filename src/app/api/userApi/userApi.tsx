import { ROLES } from "../../../constants";
import { API_TAGS } from "../../../constants/ApiTags";
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
  UpdateUserAvatarRequest,
  UpdateUserAvatarResponse,
} from "./types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query<GetUserResponse, GetUserRequest>({
      query: () => ({
        url: PATHS.SINGLE_USER,
        method: "GET",
      }),
      providesTags: [API_TAGS.USER],
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
      providesTags: [API_TAGS.USER,],
    }),
    getUserById: builder.query<GetUserByIdResponse, GetUserByIdRequest>({
      query: (id) => ({
        url: PATHS.USER_ID + id,
        method: "GET",
      }),
      providesTags: [API_TAGS.USER],
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
      invalidatesTags: [API_TAGS.USER],
    }),

    updateUserAvatar: builder.mutation<
      UpdateUserAvatarResponse,
      UpdateUserAvatarRequest
    >({
      query: (body) => ({
        url: PATHS.USER_AVATAR,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),

    // updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
    //   query: (body) => ({
    //     url: PATHS.USER_ID + body.id,
    //     method: "PATCH",
    //     body,
    //   }),
    // }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserPasswordMutation,
  useUpdateUserAvatarMutation,
} = userApi;
