import React from "react";
import { useField } from "formik";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import { Select } from "antd";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control", "form-control-solid", "searchable-select"];
  if (touched && errors) {
    classes.push("is-invalid-select");
  }

  if (touched && !errors) {
    classes.push("is-valid-select");
  }

  return classes.join(" ");
};

export function SearchableSelect({ label, withFeedbackLabel = true, customFeedbackLabel, children, ...props }) {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  return (
    <>
      {label && <label>Select {label}</label>}
      <Select
        placeholder={`Select ${label && label}`}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        className={getFieldCSSClasses(touched, error)}
        {...field}
        {...props}
      >
        {children}
      </Select>
      {withFeedbackLabel && (
        <FieldFeedbackLabel error={error} touched={touched} label={label} customFeedbackLabel={customFeedbackLabel} />
      )}
    </>
  );
}
