import * as yup from "yup";
export const editPasswordValidation = yup.object({
  old_password: yup.string().required("parol bo'sh bo'lmasligi kerak"),
  new_password: yup.string().required("parol bo'sh bo'lmasligi kerak"),
  reset_password: yup.string().required("parol bo'sh bo'lmasligi kerak"),
});

export type editPasswordValidationType = yup.InferType<
  typeof editPasswordValidation
>;
