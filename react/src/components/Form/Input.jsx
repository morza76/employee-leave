// import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';

import { TextField } from '@mui/material';

import validator from 'src/validators/validator';

export default function Input({ element, label, isFinalValid, validations, id, onInputHanlder, ...other }) {
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
  
  console.log(id , isFinalValid)
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
      <TextField
        {...other}
        error={(!isFinalValid && value.length > 0) ? 'error' : ''}
        id={id}
        label={label}
        value={value}
        // sx={{'& label':{left:'auto'}}}
        InputLabelProps={{
          sx: { 
              right: '25px', 
              left: 'auto' // این مورد باعث می‌شود که لیبل از سمت راست بیفتد
          } 
      }}
        onChange={(event) =>
          dispatch({
            type: 'CHANGE',
            value: event.target.value,
          })
        }
      />
    ) : (
      <textarea>{value}</textarea>
    );

  return <>{elem}</>;
}

Input.propTypes = {
  element: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  validations: PropTypes.array,
  onInputHanlder: PropTypes.func,
  id: PropTypes.string,
  isFinalValid: PropTypes.bool,
};
