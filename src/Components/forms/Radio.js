import React, { useEffect } from "react";
import { ErrorMessage } from "formik";
import { TextError } from "../ErrorShow/TextError";
import { Radio } from 'antd';
import { getOverflowOptions } from "antd/es/_util/placements";

export function RadioInput({
  field,
  form: { values, errors, touched, setFieldValue },
  label,
  value,
  size,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "text",
  name,
  options,
  ...props
}) {
  return (
    <>
      {label && <label> {label}</label>}
      <Radio.Group style={{marginTop: "120px"}} name={name} onChange={(e)=>{
        setFieldValue(field.name, e.target.value)
      }}>
        {options.map((option)=>(
            <Radio.Button value={option.value}>{option.name}</Radio.Button>
        ))}
      </Radio.Group>
      {<ErrorMessage name={field.name} component={TextError} />}
    </>
  );
}
