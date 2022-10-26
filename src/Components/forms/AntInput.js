import React from "react";
import { DatePicker, Form, Input, TimePicker, Select, Checkbox } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const CreateAntField = (AntComponent) => ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  type,
  name,
  required,
  tooltip,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }) => form.setFieldValue(field.name, value);
  const onChange = (value) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className="field-container">
      <label>{label}</label>
      <FormItem
        className={required && label && "requiredLabel"}
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? "error" : "success"}
        bordered={true}
      >
        <AntComponent
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
          key={field.name}
          autoComplete="nope"
          bordered={true}
        >
          {selectOptions &&
            React.Children.toArray(
              selectOptions.map((item) => (
                <Option value={item?.id} disabled={item.disabled}>
                  {item.name}
                </Option>
              ))
            )}
        </AntComponent>
      </FormItem>
    </div>
  );
};

export const AntSelect = CreateAntField(Select);
