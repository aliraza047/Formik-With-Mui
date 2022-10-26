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

export function CountrySelect({
  field, // { name, value, onChange, onBlur }
  form: { touched, values, errors, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  related,
  setCities,
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
          if (related) {
            if (typeof related == "string") {
              setFieldValue(related, "")
              setFieldTouched(related, false)
              setCities([])
            }
            else if (typeof related == "object") {
              related.map((el) => {
                setFieldValue(el, "")
                setFieldTouched(el, false)
              })
              setCities([])
            }
          }

        }}
        onBlur={(e) => {
          setFieldTouched(field.name, true);
        }}
      >
        <Option value="" disabled={true}>
          Please Select
        </Option>
        {options &&
          Object.keys(options).map((country, key) => (
            <Option key={key} value={country} selected={country === values[field.value]}>
              {country}
            </Option>
          ))}
      </Select>
      <div className="text-danger">{getPath(field.name, touched) ? getPath(field.name, errors) : ""}</div>
    </>
  );
}
