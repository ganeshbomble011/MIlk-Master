/** @format */

export interface FileRestrictions {
  maxFileSize: number;
  allowedExtensions: string[];
}

export interface FormData {
  [key: string]: unknown;
  // plantID?: {
  //   id: number;
  //   name: string;
  //   codeName: string;
  // };
}

export interface FormFieldInit<T = unknown> {
  dependencies?: T[];
  hint?: string;
  note?: string;
  readonly?: boolean;
  id?: string;
  type?:
    | 'text'
    | 'email'
    | 'number'
    | 'file'
    | 'textarea'
    | 'dropdown'
    | 'combobox'
    | 'NumericTextBox'
    | 'checkbox'
    | 'DateRangePicker'
    | 'Button';
  dataItemKey?: string;
  defaultItem?: string;
  textField?: string;
  required?: boolean;
  data?: T[];
  options?: string;
  fieldType?:
    | 'Input'
    | 'Dropdown'
    | 'TextArea'
    | 'Upload'
    | 'Checkbox'
    | 'MultiSelector'
    | 'ComboBox'
    | 'DatePicker'
    | 'NumericTextBox'
    | 'AutoComplete'
    | 'DateRangePicker'
    | 'Button'
    | 'MultiSelectTree'
    | 'DisableDatePicker';
  name: string;
  label?: string;
  validator?: boolean;
  colSpan?: number | string;
  rowSpan?: number | string;
  restrictions?: FileRestrictions;
  rows?: number;
  requiredHint?: boolean;
  validatorMessage?: string;
  disabled?: boolean | string;
  customValidator?: (value: string) => string;
  taskId?: number;
  total?: number;
  pageSize?: number;
  width?: number | string;
  formOnchange?: true;
  dataType?: 'boolean' | 'number';
  value?: string | number | boolean | Date | null | unknown;
  deptId?: number;
  clusterId?: number;
  validatorComplex?: any;
  default?: any;
  max?: number | string | Date;
  min?: number | string | Date;
  show?: boolean;
  buttonShow?: boolean;
  buttonDisable?: boolean;
  dateRule?: string;
  RoleID?: number;
}
