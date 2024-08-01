import React from "react";
import TextField from '@mui/material/TextField';

const InputType = ({
  labelText,
  require,
  inputType,
  value,
  onChange,
  name,
  Focus,
  placeholder,
}) => {
  return (
    <>
     
<TextField
          fullWidth
          margin="normal"
          required={require ? true : false}
          label={labelText}
          variant="standard"
          placeholder={placeholder}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          autoFocus={Focus? true : false}
        />
        {/* <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              /> */}

    </>
  );
};

export default InputType;


