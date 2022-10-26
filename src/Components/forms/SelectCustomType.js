import React from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import { Select } from "antd";
const { Option } = Select;

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

export function SelectCustomType({
  field, // { name, value, onChange, onBlur }
  form: { setTouched, touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  options,
  setFieldValue,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "select",
  ...props
}) {
  return (
    <>
      {label && <label> {label}</label>}
      <Select
        required={true}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        className={"select-2-custom " + getFieldCSSClasses(touched[field.name], errors[field.name])}
        {...field}
        {...props}
        onChange={(e) => {
          setFieldValue(field.name, e);
        }}
        onBlur={(e) => {
          setTouched({ ...touched, [field.name]: true });
        }}
      >
        <Option value="">Please Select</Option>
        {Object.keys(options).map((i) => (
          <Option value={options[i].type}>{options[i].value}</Option>
        ))}
      </Select>
      <div className="text-danger">{touched[field.name] ? errors[field.name] : ""}</div>
    </>
  );
}
