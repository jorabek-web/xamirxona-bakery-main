import * as yup from "yup";

export const updateUsernameValidation = yup.object({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username can only contain alphanumeric characters"
    ),
});

export type updateUsernameValdationType = yup.InferType<
  typeof updateUsernameValidation
>;
