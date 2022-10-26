import * as React from 'react';
import {Box, InputLabel, MenuItem, FormControl, Select, FormHelperText} from '@material-ui/core';

export default function BasicSelect({styles, label, value, changeHandler, options, error, helperText,index,disable=true}) {
 
   return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth style={styles}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          disabled={!disable}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={(event)=>changeHandler(event.target.value,index)}
          >
        {options.map((option, index)=> <MenuItem key={index} value={option}>{option}</MenuItem> )}
                 </Select>
                 {error && <FormHelperText style={{color:'red'}}>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
}