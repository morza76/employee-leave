// import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import { InputLabel } from '@mui/material';

import validator from 'src/validators/validator';
// import { useState } from 'react';

export default function DynamicDatePicker({
  name,
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
    name === 'date-picker' ? (
      <>
      <InputLabel id={id}>{label}</InputLabel>
      <DatePicker
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
        {...other}
        error={!isFinalValid && value.length > 0 ? 'error' : ''}
        id={id}
        label={label}
        value={value}
        format="YYYY/MM/DD"
        onChange={(date) =>{
          console.log("line59",date);
          dispatch({
            type: 'CHANGE',
            value: date.format(),
          })}
        }
      />
      </>
    ) : (
      <textarea>{value}</textarea>
    );

  return <>{elem}</>;
}

DynamicDatePicker.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.string,
  validations: PropTypes.array,
  onInputHanlder: PropTypes.func,
  id: PropTypes.string,
  isFinalValid: PropTypes.bool,
};
