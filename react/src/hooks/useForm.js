/* eslint-disable no-case-declarations */
/* eslint-disable no-restricted-syntax */
import { useReducer, useCallback } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let isFormValid = true;

      for (const input in state.inputs) {
        if (input === action.inputID) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputs[input].isValid;
        }
      }

      return {
        inputs: {
          ...state.inputs,
          [action.inputID]: {
            value: action.value,
            isValid: action.isValid,
          },
        },

        isFormValid,
      };

    default:
      return state;
  }
};

const useForm = (initInputs, initFormIsValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initInputs,
    isFormValid: initFormIsValid,
  });

  const onInputHandler = useCallback((id, value, isValid) => {
   
    if(id === "confirmPassword")
      {
       
        const isValidConfirmPassword = (value === formState.inputs.password.value);
        console.log(isValidConfirmPassword)
        dispatch({
          type: 'INPUT_CHANGE',
          value,
          isValid : isValidConfirmPassword ,
          inputID: id,
        });
      }
      else
      {
        dispatch({
          type: 'INPUT_CHANGE',
          value,
          isValid,
          inputID: id,
        });
      }

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [formState, onInputHandler];
};

export default useForm;
