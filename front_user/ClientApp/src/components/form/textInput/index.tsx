import React from "react";
import { useFormikContext } from "formik";
import { FormControl } from "react-bootstrap";
import { isFieldValid, renderControlFeedback } from "../utils";

interface AppTextInputProps {
  name: string;
  onFocus?: (ev: React.FocusEvent<Element>) => void;
}

export function AppTextInput(props: AppTextInputProps): JSX.Element {
  const { values, setFieldValue, setFieldTouched, touched, errors } =
    useFormikContext<any>();

  const valueHasChanged = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFieldValue(props.name, ev.currentTarget.value);
  };

  const fieldHasBlurred = () => {
    setFieldTouched(props.name);
  };

  return (
    <>
      <FormControl
        type="text"
        value={values[props.name]}
        onChange={valueHasChanged}
        isValid={isFieldValid(props.name, touched, errors)}
        isInvalid={!isFieldValid(props.name, touched, errors)}
        onBlur={fieldHasBlurred}
        onFocus={props.onFocus}
      />
      {renderControlFeedback(props.name, touched, errors)}
    </>
  );
}
