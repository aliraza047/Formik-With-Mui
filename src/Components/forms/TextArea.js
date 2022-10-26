import React from "react";
import { ErrorMessage } from "formik";
import { getPath, TextError } from "../../../../app/modules/Common/utils";
const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function TextArea({
  field,
  form: { errors, touched },
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  ...props
}) {
  const propClass = props.className ? props.className : "";

  return (
    <>
      {label && <label> {label}</label>}
      <textarea
        class={`${propClass} ${getFieldCSSClasses(getPath(field.name, touched), getPath(field.name, errors))}`}
        {...field}
        {...props}
      />
      {withFeedbackLabel && <ErrorMessage name={field.name} component={TextError} />}
    </>
  );
}
