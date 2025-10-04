/** @format */

import { FormFieldInit } from '../types/formTypes';

interface FormData {
  [key: string]: unknown;
}

export function transformPayloadWithArray(
  payload: FormData,
  formFields: FormFieldInit[]
): FormData {
  let newPayload: FormData = { ...payload };

  formFields.forEach((field: FormFieldInit) => {
    if (
      (field.fieldType === 'Dropdown' && newPayload[field.name]) ||
      (field.fieldType === 'AutoComplete' && newPayload[field.name]) ||
      (field.fieldType === 'ComboBox' && newPayload[field.name])
    ) {
      const keyToExtract = field.dataItemKey;
      const fieldValue = newPayload[field.name] as { [key: string]: unknown };
      if (
        fieldValue &&
        typeof fieldValue === 'object' &&
        keyToExtract !== undefined &&
        keyToExtract in fieldValue
      ) {
        newPayload[field.name] = fieldValue[keyToExtract];
      }
    } else if (
      field.fieldType === 'Checkbox' &&
      newPayload[field.name] !== undefined
    ) {
      const fieldValue = newPayload[field.name];

      if (field.dataType === 'number') {
        newPayload[field.name] = fieldValue ? 1 : 0;
      } else if (field.dataType === undefined) {
        newPayload[field.name] = fieldValue ? true : false;
      }
    } else if (field.type === 'number') {
      const fieldValue = Number(newPayload[field.name]);
      newPayload[field.name] = fieldValue;
    }
  });

  return newPayload;
}
