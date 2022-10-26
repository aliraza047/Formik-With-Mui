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

export function SubObjectSelect({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue, values, setTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  options,
  withFeedbackLabel = true,
  customFeedbackLabel,
  objectName,
  ...props
}) {
  if (Object.keys(values).length > 0) {
    const setValue = (e) => {
      const object = JSON.parse(JSON.stringify(values[objectName]));
      object[field.name] = e.target.value;
      setFieldValue(objectName, object);
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

        <select
          className={getFieldCSSClasses(
            touched[objectName] && touched[objectName][field.name],
            errors[objectName] && errors[objectName][field.name]
          )}
          {...field}
          {...props}
          onChange={setValue}
          onBlur={setTouch}
        >
          <option value="">Please Select</option>
          {Object.keys(options).map((keyName, i) => (
            <option value={options[keyName].value} selected={options[keyName].value === values[objectName][field.name]}>
              {options[keyName].name}
            </option>
          ))}
        </select>

        {withFeedbackLabel && (
          <FieldFeedbackLabel
            error={errors[objectName] && errors[objectName][field.name]}
            touched={touched[objectName] && touched[objectName][field.name]}
            label={label}
            customFeedbackLabel={customFeedbackLabel}
          />
        )}
      </>
    );
  } else {
    return <></>;
  }
}
