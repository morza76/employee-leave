// import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';

import { Select, MenuItem, InputLabel } from '@mui/material';

import validator from 'src/validators/validator';
// import { useState } from 'react';

export default function DynamicSelect({
  element,
  options,
  label,
  isFinalValid,
  validations,
  id,
  onInputHanlder,
  ...other
}) {
  const inputReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE': {
        return {
          value: action.value,
          isValid: validator(action.value, validations),
        };
      }

      default:
        return state;
    }
  };

  console.log(id, isFinalValid);
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
  });

  const { value, isValid } = mainInput;

  useEffect(() => {
    onInputHanlder(id, value, isValid);
  }, [value, id, isValid, onInputHanlder]);

  const elem =
    element === 'input' ? (
      <>
      {/* <InputLabel id={id}>{label}</InputLabel> */}
      <Select
        {...other}
        error={!isFinalValid && value.length > 0 ? 'error' : ''}
        id={id}
        label={label}
        value={value}
        displayEmpty
        onChange={(event) =>
          dispatch({
            type: 'CHANGE',
            value: event.target.value,
          })
        }
      >
        <MenuItem value="" disabled>
        {label}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>{option.lable}</MenuItem>
        ))}
      </Select>
      </>
    ) : (
      <textarea>{value}</textarea>
    );

  return <>{elem}</>;
}

DynamicSelect.propTypes = {
  element: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.string,
  validations: PropTypes.array,
  onInputHanlder: PropTypes.func,
  id: PropTypes.string,
  isFinalValid: PropTypes.bool,
};
