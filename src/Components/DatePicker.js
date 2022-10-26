import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DesktopDatePicker from '@material-ui/lab/DatePicker';

export default function DatePicker({labelText, value, changeHandler, helperText, error}) {
  console.log({value})
    return (
    <LocalizationProvider >
      <DesktopDatePicker
        label={labelText}
        value={value}
        onChange={(newValue) => {
          changeHandler(newValue);
        }}
        renderInput={(params) => <TextField {...params} error={error} helperText={helperText}/>}
      />
    </LocalizationProvider>
  );
}