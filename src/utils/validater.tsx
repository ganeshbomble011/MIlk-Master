/** @format */

import { getter } from '@progress/kendo-react-common';

const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex: RegExp = new RegExp(/^[0-9 ()+-]+$/);
const emailGetter = getter('email');

export const emailValidator = (value: string) =>
  !value
    ? 'Email field is required.'
    : emailRegex.test(value)
    ? ''
    : 'Email is not in a valid format.';
export const phoneValidator = (value: string) =>
  !value
    ? 'Phone number is required.'
    : phoneRegex.test(value)
    ? ''
    : 'Not a valid phone number.';
export const requiredValidator = (value: string) =>
  value ? '' : ' This field is required.';
export const expiryDaysValidator = (value: string) => {
  if (!value) {
    return 'This field is required.';
  }

  const numericValue = Number(value);

  if (isNaN(numericValue) || numericValue <= 0) {
    return 'Only numeric values greater than 0 are allowed.';
  }

  return '';
};
export const passwordValidator = (value: any) => {
  if (!value) {
    return 'Password is required.';
  }

  if (value.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  const containsLowerCase = /[a-z]/.test(value);
  const containsUpperCase = /[A-Z]/.test(value);
  const containsNumber = /\d/.test(value);
  const containsSpecialCharacter = /[^a-zA-Z0-9]/.test(value);

  if (
    !containsLowerCase ||
    !containsUpperCase ||
    !containsNumber ||
    !containsSpecialCharacter
  ) {
    return 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.';
  }

  return '';
};
export const formValidator = (values: string) => {
  const emailValue = emailGetter(values);

  if (emailValue && emailRegex.test(emailValue)) {
    return {};
  }
};
export const alphabeticValidator = (value: string) => {
  if (!/^[a-zA-Z]*$/.test(value)) {
    return ' Only alphabetic characters are allowed.';
  }
  if (value.length > 50) {
    return ' Maximum 50 characters allowed.';
  }
  return '';
};
export const fiftyWordsValidator = (value: string) => {
  if (!/^[a-zA-Z\s]*$/.test(value)) {
    return 'Only characters and spaces are allowed.';
  }
  if (value && value.length > 50) {
    return 'Maximum 50 characters allowed.';
  }
  return '';
};
export const onlyCharactersWordsValidator = (value: string) => {
  if (!/^[a-zA-Z]*$/.test(value)) {
    return 'Only characters are allowed.';
  }
  if (value && value.length > 50) {
    return 'Maximum 50 characters allowed.';
  }
  return '';
};
export const firstNameValidationDemo = (value: string) => {
  if (!value) {
    return ' This field is required.';
  } else if (!/^[a-zA-Z]*$/.test(value)) {
    return 'Only characters are allowed.';
  } else if (value && value.length > 50) {
    return 'Maximum 50 characters allowed.';
  }
  return '';
};
export const fifteenWordsValidator = (value: string) => {
  if (value) {
    if (!/^\d+$/.test(value)) {
      return 'Not a valid phone number.';
    } else if (value && value?.length > 15) {
      return ' Maximum 15 characters allowed.';
    } else if (value && value?.length < 7) {
      return ' Minimum 7 characters allowed.';
    }
    return '';
  }
  return '';
};
export const confirmPasswordValidator = (
  value: string,
  confirmPassword?: string
) => {
  if (!value || value.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  if (confirmPassword !== undefined && value !== confirmPassword) {
    return 'Password do not match';
  }

  return '';
};
export const requiredAndMaxLengthValidator = (value: string) => {
  if (!value) {
    return ' This field is required.';
  } else if (value.length > 50) {
    return ' Maximum 50 characters allowed.';
  } else if (!/^[a-zA-Z\s]*$/.test(value)) {
    return ' Only letters and spaces are allowed.';
  }
  return '';
};
export const validatePassword = (value: any) => {
  if (!value) return 'Password is required.';
  if (value.length < 8) return 'Password must be at least 8 characters long.';
  if (
    !/[a-z]/.test(value) ||
    !/[A-Z]/.test(value) ||
    !/\d/.test(value) ||
    !/[^a-zA-Z0-9]/.test(value)
  ) {
    return 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.';
  }
  return '';
};
export const newEmailValidator = (value: any) => {
  if (!value) return 'Email id is required';
  if (!/\S+@\S+\.\S+/.test(value)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const uploadFormValidator = (value: any) => {
  return value ? '' : ' This field is required.';
};
