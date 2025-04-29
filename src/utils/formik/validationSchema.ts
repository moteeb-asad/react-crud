// Yup
import * as Yup from "yup";

// validation schema for the add record form
export const addRecordSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .typeError("Title must be a string"),
  upvotes: Yup.number()
    .required("Upvotes is required")
    .min(0, "Upvotes must be at least 0")
    .max(100, "Upvotes must be at most 100"),
  date: Yup.date()
    .required("Date is required")
    .typeError("Please select a valid date"),
});
