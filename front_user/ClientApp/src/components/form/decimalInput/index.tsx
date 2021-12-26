import { useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FormControl } from "react-bootstrap";
import { isFieldValid, renderControlFeedback } from "../utils";

interface DecimalInputProps {
  name: string;
  required?: boolean;
  numberType?: "decimal" | "currency" | "percent" | "unit";
  decimalPlaces?: number;
  storeAsRealNumber?: boolean;
  currency?: boolean;
  value?: string | number | string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function DecimalInput(props: DecimalInputProps): JSX.Element {
  const { values, errors, touched, setFieldTouched, setFieldValue } =
    useFormikContext<any>();

  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      (editInputRef.current as unknown as HTMLInputElement)?.focus();
    }
    return () => {};
  }, [isEditing]);

  const onFocus = () => {
    setIsEditing(true);
  };

  const onBlur = () => {
    setFieldTouched(props.name, true);
    setIsEditing(false);
  };

  const getDecimalPlaces = (): number => {
    if (!props.decimalPlaces) {
      return 2;
    }
    return props.decimalPlaces > 0 ? props.decimalPlaces : 1;
  };

  const getNumberOfTenths = (fixDecimalsBy = 0): number => {
    return Math.pow(10, getDecimalPlaces() + fixDecimalsBy);
  };

  const getViewingValue = () => {
    let currentValue = values[props.name] as number;
    if (!props.storeAsRealNumber) {
      currentValue = currentValue / getNumberOfTenths();
    }

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: getDecimalPlaces(),
    });

    return formatter.format(currentValue);
  };

  const getEditingValue = () => {
    let currentValue = Number(values[props.name]);
    if (!props.storeAsRealNumber) {
      currentValue = currentValue / getNumberOfTenths();
    }
    return currentValue.toFixed(getDecimalPlaces()).replace(".", ",");
  };

  const setValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const text = ev.currentTarget.value.replace(",", "");
    let currentValue = Number(values[props.name]);

    let newValue = Number(text);
    if (newValue === currentValue) {
      // Probably number is multiple of 10
      newValue = Math.round(newValue / 10);
    }

    if (props.storeAsRealNumber) {
      newValue = Number(
        (newValue / getNumberOfTenths()).toFixed(getDecimalPlaces())
      );
    }
    setFieldValue(props.name, newValue);
  };

  return (
    <>
      {!isEditing && (
        <FormControl
          value={getViewingValue()}
          isValid={isFieldValid(props.name, touched, errors)}
          isInvalid={!isFieldValid(props.name, touched, errors)}
          onFocus={onFocus}
          onChange={() => onFocus()}
        />
      )}
      {isEditing && (
        <>
          <FormControl
            ref={editInputRef}
            isValid={isFieldValid(props.name, touched, errors)}
            isInvalid={!isFieldValid(props.name, touched, errors)}
            value={getEditingValue()}
            onBlur={onBlur}
            onChange={setValue}
          />
        </>
      )}
      {renderControlFeedback(props.name, touched, errors)}
    </>
  );
}
