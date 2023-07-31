import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("*Name is required"),
  budget: yup.number().required("*Budget is required"),
  category: yup.string().required("*Category is required"),
  description: yup.string().required("*Description is required"),
  date: yup.string().required("*Date is required"),
  duration: yup.number().required("*Duration is required"),
});
