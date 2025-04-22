import * as Yup from "yup";

export const recordSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .typeError("Title must be a string"),

  upvotes: Yup.number()
    .required("Upvotes is required")
    .min(0, "Upvotes must be at least 0")
    .max(100, "Upvotes cannot exceed 100")
    .typeError("Upvotes must be a number"),

  date: Yup.date()
    .required("Date is required")
    .typeError("Please select a valid date"),
});
