import * as yup from "yup";

export const useLoginValidation = () =>
  yup.object({
    username: yup.string().required("Username majburiy"),
    password: yup
      .string()
      .min(6, "Parol kamida 6 ta belgi bo‘lishi kerak")
      .matches(/[a-z]/, "Parolda kamida 1 ta kichik harf bo‘lishi kerak")
      .matches(/[A-Z]/, "Parolda kamida 1 ta katta harf bo‘lishi kerak")
      .matches(/\d/, "Parolda kamida 1 ta raqam bo‘lishi kerak")
      .matches(/[@$!%*?&#]/, "Parolda kamida 1 ta maxsus belgi bo‘lishi kerak")
      .required("Parol majburiy"),
  });

export type LoginValidationType = yup.InferType<
  ReturnType<typeof useLoginValidation>
>;

async function validateData() {
  const schema = useLoginValidation();
  try {
    await schema.validate(
      {
        username: "", // Xato: bo‘sh bo‘lishi mumkin emas
        password: "odilbek", // Xato: kuchli emas
      },
      { abortEarly: false }
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.log(error.errors); // Barcha xatolar ro‘yxatini chiqarish
    }
  }
}

validateData();
