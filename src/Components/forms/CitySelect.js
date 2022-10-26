import React from "react";
import { Select } from "antd";
import { getPath } from "../../../../app/modules/Common/utils";
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

export function CitySelect({
  field, // { name, value, onChange, onBlur }
  form: { touched, values, errors, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  options,
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
        className={"select-2-custom " + getFieldCSSClasses(getPath(field.name, touched), getPath(field.name, errors))}
        {...field}
        {...props}
        onChange={(e) => {
          setFieldValue(field.name, e);
        }}
        onBlur={(e) => {
          setFieldTouched(field.name, true);
        }}
      >
        <Option value="" disabled={true}>
          Please Select
        </Option>
        {options &&
          options.map((city, key) => (
            <Option key={key} value={city} selected={city === values[field.value]}>
              {city}
            </Option>
          ))}
        <Option value="other">Other</Option>
      </Select>
      <div className="text-danger">{getPath(field.name, touched) ? getPath(field.name, errors) : ""}</div>
    </>
  );
}
