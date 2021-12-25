import React from "react";
import { useFormikContext } from "formik";
import { Form } from "react-bootstrap";

interface AppCheckboxInputProps {
  id: string;
  name: string;
  label: string;
}

export function AppCheckboxInput(props: AppCheckboxInputProps): JSX.Element {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<any>();

  const valueHasChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(props.name, ev.currentTarget.checked);
  };

  const fieldHasBlurred = () => {
    setFieldTouched(props.name);
  };

  return (
    <Form.Check
      type="checkbox"
      id={props.id}
      label={props.label}
      checked={values[props.name]}
      onChange={valueHasChanged}
      onBlur={fieldHasBlurred}
    />
  );
}
