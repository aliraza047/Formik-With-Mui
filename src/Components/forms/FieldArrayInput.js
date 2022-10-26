import React from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import { toBase64 } from "../../../../app/modules/Common//utils";
import { async } from "rxjs";

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

export function FieldArrayInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  index,
  fieldName,
  autoFocus,
  fieldFor,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "text",
  ...props
}) {
  const brandRef = React.useRef(null);
 
  React.useEffect(() => {
    console.log(index);
    if (index == 0 || index == 1) {
      if (autoFocus == false) {
        brandRef.current.blur();
      } else {
        brandRef.current.focus();
      }
    }
  }, []);
  return (
    <>
      {label && <label> {label}</label>}
      {type === "file" ? (
        <input
          type={type}
          // ref={brandRef}
          className={getFieldCSSClasses(
            touched[fieldFor] ? (touched[fieldFor][index] ? touched[fieldFor][index][fieldName] : null) : null,
            errors[fieldFor] ? (errors[fieldFor][index] ? errors[fieldFor][index][fieldName] : null) : null
          )}
          {...field}
          {...props}
          onChange={async (e) => {
            const fieldArray = JSON.parse(JSON.stringify(values[fieldFor]));
            fieldArray[index][fieldName] = await toBase64(e.currentTarget.files[0]);
            // console.log(fieldArray);
            setFieldValue(fieldFor, fieldArray);
          }}
        />
      ) : (
        <input
          type={type}
          ref={brandRef}
          className={getFieldCSSClasses(
            touched[fieldFor] ? (touched[fieldFor][index] ? touched[fieldFor][index][fieldName] : null) : null,
            errors[fieldFor] ? (errors[fieldFor][index] ? errors[fieldFor][index][fieldName] : null) : null
          )}
          {...field}
          {...props}
        />
      )}
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[fieldFor] ? (errors[fieldFor][index] ? errors[fieldFor][index][fieldName] : null) : null}
          touched={touched[fieldFor] ? (touched[fieldFor][index] ? touched[fieldFor][index][fieldName] : null) : null}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
