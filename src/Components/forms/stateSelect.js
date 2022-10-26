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

export function StateSelect({
  field, // { name, value, onChange, onBlur }
  form: { touched, values, errors, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  related,
  options,
  withFeedbackLabel = true,
  customFeedbackLabel,
  getCityData,
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
          if (!!related) {
            setFieldValue(related, "");
            setFieldTouched(related, false)
          }
          if (getCityData) getCityData(e);
        }}
        onBlur={(e) => {
          setFieldTouched(field.name, true);
        }}
      >
        <Option value="" disabled={true}>
          Please Select
        </Option>
        {options.map(
          (state, key) =>
            state != null && (
              <Option key={key} value={state} selected={state === values[field.value]}>
                {state}
              </Option>
            )
        )}
        <Option value="other" disabled={false}>
          Other
        </Option>
      </Select>
      <div className="text-danger">{getPath(field.name, touched) ? getPath(field.name, errors) : ""}</div>
    </>
  );
}
