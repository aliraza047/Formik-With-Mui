import React from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";

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

export function SelectCustom({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  options,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "text",
  ...props
}) {
  return (
    <>
      {label && <label> {label}</label>}
      <select className={getFieldCSSClasses(touched[field.name], errors[field.name])} {...field} {...props}>
        <option value="">Please Select</option>
        {Object.keys(options).map((keyName, i) => (
          <option value={options[keyName].value}>{options[keyName].name}</option>
        ))}
      </select>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
