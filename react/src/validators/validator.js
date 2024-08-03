/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
import rules from './rules';

const validator = (value, validations) => {
  const validationResults = [];

  for (const validation of validations) {
    if (validation.value === rules.requiredValue) {
      !value.trim().length && validationResults.push(false);
    }
    if (validation.value === rules.minValue) {
      value.trim().length < validation.min && validationResults.push(false);
    }
    if (validation.value === rules.maxValue) {
      value.trim().length > validation.max && validationResults.push(false);
    }
 
  }

  if (validationResults.length) {
    return false;
  }
  return true;
};

export default validator;
