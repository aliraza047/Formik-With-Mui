import React from "react";
import { Select } from "antd";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
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

export function SubObjectStateSelect({
  field, // { name, value, onChange, onBlur }
  form: { setTouched, touched, errors, values, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  related,
  options,
  withFeedbackLabel = true,
  objectName,
  customFeedbackLabel,
  getCityData,
  type = "select",
  ...props
}) {
  if (Object.keys(values).length > 0) {
    const setValue = (e) => {
      const object = JSON.parse(JSON.stringify(values[objectName]));
      console.log(object);
      object[field.name] = e;
      setFieldValue("address.state", e);
      getCityData(e);
      if (related) setFieldValue(related, '');
    };
    const setTouch = (e) => {
      if (!(objectName in touched)) {
        setTouched({ ...touched, [objectName]: { [field.name]: true } });
      } else {
        setTouched({ ...touched, [objectName]: { ...touched[objectName], [field.name]: true } });
      }
    };
    return (
      <>
        {label && <label> {label}</label>}
        <Select
          required={true}
          showSearch
          defaultValue={values[objectName][field.name]}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          className={
            "select-2-custom " +
            getFieldCSSClasses(
              touched[objectName] ? touched[objectName][field.name] : undefined,
              errors[objectName] ? errors[objectName][field.name] : undefined
            )
          }
          {...field}
          {...props}
          onChange={setValue}
          onBlur={setTouch}
        >
          <Option disabled={true} value="">
            Please Select
          </Option>
          {options.map((state, key) => (
            <Option key={key} value={state}>
              {state}
            </Option>
          ))}
        </Select>
        <div className="text-danger">
          {touched[objectName] && touched[objectName][field.name]
            ? errors[objectName]
              ? errors[objectName][field.name]
              : ""
            : ""}
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
