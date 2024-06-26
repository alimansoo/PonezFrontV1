import { MenuItem, TextField } from "@mui/material";
import React from "react";

const TextInput = ({
  inputRef,
  children,
  register,
  label,
  size = "medium",
  variant = "outlined",
  errorMessage = null,
  placeholder = "",
  helperText,
  type = "text",
  multiline = false,
  required = false,
  select = false,
  value = "",
  prefix = undefined,
  fullWidth = true,
  autoFocus = false,
  onChange,
}) => {
  return (
    <label className="flex flex-col gap-3 w-full">
      {helperText && (
        <div className="label p-0">
          <span className="label-text-alt pb-4 leading-6 text-xs text-gray-400">
            {helperText}
          </span>
        </div>
      )}
      <TextField
        {...register}
        inputRef={inputRef}
        error={errorMessage}
        variant={variant}
        autoComplete="off"
        label={label}
        size={size}
        placeholder={placeholder}
        type={type}
        multiline={multiline}
        rows={multiline && 5}
        required={required}
        select={select}
        fullWidth={fullWidth}
        autoFocus={autoFocus}
        onChange={onChange || undefined}
        InputProps={
          prefix
            ? {
                endAdornment: (
                  <span className="text-xs bg-primary-0 text-primary-70 py-1 px-2 rounded-lg mr-2 Fanum">
                    {prefix}
                  </span>
                ),
              }
            : undefined
        }
        defaultValue={value}
      >
        {select &&
          children.map((value, index) => (
            <MenuItem
              dir="rtl"
              className="Fanum"
              key={index}
              value={value.name}
            >
              {value.name}
            </MenuItem>
          ))}
      </TextField>
      {errorMessage && (
        <div className="text-xs text-red-600 ">{errorMessage}</div>
      )}
    </label>
  );
};
export default TextInput;
