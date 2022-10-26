import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "../ErrorShow/TextError";

export function OneSelected({
  option0 = true,
  field,
  label,
  form: { touched, errors },
  type = "select",
  options,
  ...props
}) {
  return (
    <>
      {label && <label>{label}</label>}
      <Field
        as="select"
        {...field}
        {...props}
      >
        {option0 && <option key="option-0" value="">
          Please Select
        </option>}
        {Object.keys(options).map((i) => (
          <option key={i} value={options}>
            {options}
          </option>
        ))}
      </Field>
      {<ErrorMessage name={field.name} component={TextError} />}
    </>
  );
}
