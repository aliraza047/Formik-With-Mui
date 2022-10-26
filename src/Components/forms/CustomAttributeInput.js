import React, { useState, useEffect } from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import { getCustomAttributeError, formatDate } from "../../.././../app/modules/Common/utils";
import moment from "moment";

const getFieldCSSClasses = (touch, error) => {
  const classes = ["form-control"];

  if (touch && error) {
    classes.push("is-invalid");
  }

  if (touch && !error) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function CustomAttributeInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  attributeType,
  index,
  values,
  groupIndex,
  type = "text",
  ...props
}) {
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (attributeType === "attributes" && values[attributeType][index]["values"]) {
      setValue(values[attributeType][index]["values"]);
    } else if (
      attributeType === "attribute_groups" &&
      values[attributeType][groupIndex]["attributes"][index]["values"]
    ) {
      setValue(values[attributeType][groupIndex]["attributes"][index]["values"]);
    }
  }, [values]);

  return (
    <div className="mb-5">
      {label && <label> {label}</label>}
      {type === "textarea" ? (
        <textarea
          className={getFieldCSSClasses(
            touched[field.name],
            getCustomAttributeError(errors, attributeType, index, groupIndex, label)
          )}
          {...field}
          {...props}
          value={value}
        />
      ) : (
        <input
          type={type}
          className={getFieldCSSClasses(
            touched[field.name],
            getCustomAttributeError(errors, attributeType, index, groupIndex, label)
          )}
          {...field}
          {...props}
          value={value}
        />
      )}
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={getCustomAttributeError(errors, attributeType, index, groupIndex, label)}
          touched={touched[field.name]}
          label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </div>
  );
}
