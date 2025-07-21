import { baseApi } from "../baseApi";
import { PATHS } from "./path";

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<string, FormData>({
      query: (file) => ({
        url: PATHS.UPLOAD,
        method: "POST",
        body: file,
        responseHandler: "text",
      }),
    }),
  }),
});
export const { useUploadImageMutation } = uploadApi;
