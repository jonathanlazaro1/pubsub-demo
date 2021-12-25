import React from "react";
import { useFormikContext } from "formik";
import { FormControl } from "react-bootstrap";

interface AppTextInputProps {
  name: string;
  onFocus?: (ev: React.FocusEvent<Element>) => void;
}

export function AppTextInput(props: AppTextInputProps): JSX.Element {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<any>();

  const valueHasChanged = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFieldValue(props.name, ev.currentTarget.value);
  };

  const fieldHasBlurred = () => {
    setFieldTouched(props.name);
  };

  return (
    <FormControl
      type="text"
      value={values[props.name]}
      onChange={valueHasChanged}
      onBlur={fieldHasBlurred}
      onFocus={props.onFocus}
    />
  );
}
