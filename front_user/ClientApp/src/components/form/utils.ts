import { FormikErrors, FormikTouched } from "formik";

export const isFieldValid = (
  name: string,
  touched: FormikTouched<any>,
  errors: FormikErrors<any>
) => (touched[name] ? errors[name] === undefined : true);
