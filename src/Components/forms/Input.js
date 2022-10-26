import React, { useEffect } from "react";
import { ErrorMessage } from "formik";
import { TextError } from "../ErrorShow/TextError";

export function Input({
  field,
  form: { values, errors, touched },
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "text",
  ...props
}) {
  
  return (
    <>
      {label && <label> {label}</label>}
      <input
      
        type={type}
        {...field}
        {...props}
      />
      
      {<ErrorMessage name={field.name} component={TextError} />}
    </>
  );
}
