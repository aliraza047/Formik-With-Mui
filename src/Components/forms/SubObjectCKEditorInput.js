import React from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

export function Input({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue, values, setTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  objectName,
  type = "text",
  ...props
}) {
  const setValue = (event, editor) => {
    const object = values[objectName];
    object[field.name] = editor.getData();
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
      <CKEditor
        name={field.name}
        config={{
          removePlugins: ["Image", "ImageCaption", "ImageStyle", "ImageToolbar", "ImageUpload", "MediaEmbed"],
        }}
        editor={ClassicEditor}
        className={
          "csEditor " +
          getFieldCSSClasses(
            touched[objectName] && touched[objectName][field.name],
            errors[objectName] && errors[objectName][field.name]
          )
        }
        {...field}
        {...props}
        data={values[field.name]}
        onChange={setValue}
        onBlur={setTouch}
      />
      <div className="text-danger">
        {touched[objectName] && touched[objectName][field.name]
          ? errors[objectName]
            ? errors[objectName][field.name]
            : ""
          : ""}
      </div>
    </>
  );
}
