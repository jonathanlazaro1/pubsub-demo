import React from "react";
import { FormikErrors, FormikTouched } from "formik";
import { Form } from "react-bootstrap";

export const isFieldValid = (
  name: string,
  touched: FormikTouched<any>,
  errors: FormikErrors<any>
) => (touched[name] ? errors[name] === undefined : true);

export const renderControlFeedback = (
  name: string,
  touched: FormikTouched<any>,
  errors: FormikErrors<any>
) => {
  if (!isFieldValid(name, touched, errors)) {
    return (
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    );
  }

  return null;
};
