import React, { useState } from "react";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import h2p from "html2plaintext";
import { setSupplierDescription } from "../../../../app/modules/Inventory/_redux/suppliers/suppliersActions";

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

export function CKEditorInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldError, values, setFieldValue, setTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "text",
  ...props
}) {
  const [charCount, setCharCount] = useState(values?.description ? h2p(values.description).length : 0);
  const setTouch = () => {
    setTouched({ ...touched, [field.name]: true });
  };
  const setValue = (event, editor) => {
    let descriptionWords = editor.getData();
    let description = h2p(descriptionWords);
    let count = description.length;
    setCharCount(count);
    setFieldValue("description", editor.getData());
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
        className={"csEditor " + getFieldCSSClasses(touched[field.name], errors[field.name])}
        {...field}
        {...props}
        data={values[field.name] || ""}
        onChange={setValue}
        onBlur={setTouch}
      />
      <div className="float-right">
        {/* {errors.description && errors.description} */}
        <p style={{ color: charCount <= 1000 ? "black" : "red" }}>
          {charCount > 1000 ? "Description must be less than 1000 characters. " : ""}
          {1000 - charCount} word(s) out of 1000 remaining
        </p>
      </div>
      <div className="text-danger">{touched[field.name] ? errors[field.name] : ""}</div>
    </>
  );
}
