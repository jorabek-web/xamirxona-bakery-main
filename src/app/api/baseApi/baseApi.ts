import { useStorage } from "./../../../utils/store/store";
import { SERVER_URL } from "../../../constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      const token = useStorage.getTokens()?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "user",
    "complaint",
    "message",
    "branch",
    "doughroom",
    "notification",
  ],
});
export default baseApi;
