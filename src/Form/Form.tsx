/** @format */

import React, { useEffect, useState } from 'react';
import {
  Field,
  FieldProps,
  FieldRenderProps,
  FormValidatorType as KendoFormValidatorType,
  Form as OkForm,
} from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import {
  LABEL_ADD,
  LABEL_CLEAR,
  LABEL_STAR,
  LABEL_UPDATE,
} from '../constants/Common';
import { FormComponent } from './FormComponent';
// import './form.css';
import { FileRestrictions } from '../../src/types/formTypes';
// import { useGetDropDownMasterQuery } from '@store/services/gridConfigServices/dropdown-services';
import { AccessFromButton } from '../utils/accessFilter';
import { emailValidator } from '../utils/validater';

interface ApiData {
  taskId: number;
  data: unknown[];
  isLoading: boolean;
}

interface FormProps {
  formField: FormFieldInit[];
  editValue?: { [key: string]: unknown };
  formOnchange: (event: FieldProps) => void;
  formaStyle?: React.CSSProperties;
  formaClassName?: string;
  handleSubmit?: (data: { [key: string]: unknown }) => void;
  formRef: React.RefObject<HTMLFormElement | null>;
  apiData?: ApiData[];
  refreshKey?: number;
  CancelButtonShow?: boolean;
  SubmitLabel?: string;
  setEditValue: React.Dispatch<
    React.SetStateAction<{
      [key: string]: unknown;
    }>
  >;
  setSelectedDropdownData?: Function;
  handleCustomerClear?: () => void;
  validatorComplex?: any;
  submitButtonShow?: boolean;
  buttonProps?: AccessFromButton;
  handleFormButton?: any;
  ignoreModified?: boolean;
}

const {
  FormDropDownList,
  FormInput,
  FormDateTimePicker,
  FormCheckbox,
  FormTextArea,
  FormDatePicker,
  FormMaskedInputWithCountryCode,
  FormUpload,
  FormAutoComplete,
  FormNumericTextBox,
  FormComboBox,
  FormMultiSelect,
  FormMultiSelectTree,
  FormDisableLogicDatePicker,
  FormCheckboxInside,
  FormDividedInput,
} = FormComponent();

const fieldComponents: {
  [key: string]: React.ComponentType<FieldRenderProps>;
} = {
  Input: FormInput,
  TextArea: FormTextArea,
  Dropdown: FormDropDownList,
  MultiSelector: FormMultiSelect,
  DatePicker: FormDatePicker,
  Checkbox: FormCheckbox,
  Upload: FormUpload,
  AutoComplete: FormAutoComplete,
  NumericTextBox: FormNumericTextBox,
  MultiSelectTree: FormMultiSelectTree,
  ComboBox: FormComboBox,
  DisableDatePicker: FormDisableLogicDatePicker,
  CheckFormBox: FormCheckboxInside,
  DividedInput: FormDividedInput,
};

type FormFieldInit<T = unknown> = {
  validatorComplex?: any;
  formOnchange?: boolean;
  restrictions?: FileRestrictions;
  hint?: unknown;
  note?: unknown;
  readonly?: unknown;
  id?: string;
  type?: string;
  dataItemKey: string;
  defaultItem?: string;
  textField?: unknown;
  required?: unknown;
  data?: T[];
  options?: string;
  fieldType: string;
  name: string;
  label?: string;
  validator?: boolean;
  colSpan?: number | string;
  rowSpan?: number | string;
  rows?: number;
  requiredHint?: boolean;
  validatorMessage?: string;
  customValidator?: (value: string) => string;
  taskId?: number;
  total?: number;
  pageSize?: number;
  width?: number | string;
  disabled?: boolean | string;
  value?: unknown | null;
  default?: unknown;
  deptId?: number;
  clusterId?: number;
  pageID?: number;
  max?: number | Date | string;
  min?: number | Date | string;
  isAdd?: boolean;
  isUpdate?: boolean;
  isView?: boolean;
  dateRule?: string;
  RoleID?: number;
  design?: string;
  format?: string;
};

type FormValidatorType = KendoFormValidatorType & {
  [key: string]: unknown;
};

interface DropdownOption {
  [key: string]: unknown;
}

const CustomField = ({ label }: { label: string }) => (
  <div className='form-group'>
    <label className='form-group-label'>
      <span className='form-label'>{label}</span>
      <span className='label-form'> {LABEL_STAR}</span>
    </label>
  </div>
);

function Form({
  formField,
  editValue,
  formOnchange,
  formaStyle = {},
  formaClassName,
  handleSubmit,
  formRef,
  apiData = [],
  SubmitLabel,
  CancelButtonShow,
  submitButtonShow,
  setEditValue,
  setSelectedDropdownData,
  handleCustomerClear,
  buttonProps,
  handleFormButton,
  ignoreModified,
}: FormProps) {
  const [initialValues, setInitialValues] = useState<{
    [key: string]: unknown;
  }>({});
  const userData = JSON.parse(sessionStorage.getItem('userDetails') || '{}');

  const dropdownData = formField.reduce((acc, field) => {
    if (
      (field.fieldType === 'Dropdown' ||
        field.fieldType === 'AutoComplete' ||
        field.fieldType === 'MultiSelector' ||
        field.fieldType === 'MultiSelectTree' ||
        field.fieldType === 'ComboBox') &&
      field.taskId
    ) {
      let payload = {
        taskId: field.taskId,
        clusterId: field?.clusterId ?? 0,
        locationId: '',
        DeptId: field?.deptId ?? 0,
        instrumentid: 0,
        roleID: field?.RoleID ?? userData.roleID,
        userID: userData.userID,
        PageID: field?.pageID ?? 0,
      };
      //   const { data, isLoading } = useGetDropDownMasterQuery(payload, {
      //     refetchOnMountOrArgChange: true,
      //   });
      //   acc[field.name] = { data: data?.data || [], isLoading };
    }

    return acc;
  }, {} as { [key: string]: { data: any[]; isLoading: boolean } });

  const validatorHandle = (
    value: FormValidatorType
  ): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
    formField.forEach((item) => {
      if (item.validator && !value[item.name]) {
        errors[item.name] = item.validatorMessage || 'This field is required.';
      }
      if (item.customValidator) {
        const customError = item.customValidator(value[item.name] as string);
        if (customError) {
          errors[item.name] = customError;
        }
      }
      if (item.validatorComplex) {
        const customError = item.validatorComplex(value);
        errors[item.name] = customError;
      }
    });

    return errors;
  };

  useEffect(() => {
    let generatedValues;

    generatedValues = formField.reduce((acc, field) => {
      if (field.fieldType === 'Dropdown' || field.fieldType === 'ComboBox') {
        const dropdownOptions =
          field.data || dropdownData[field.name]?.data || [];
        let selectedValue = null;

        if (editValue?.[field.name] != null) {
          selectedValue =
            dropdownOptions.find(
              (option) => option[field.dataItemKey] === editValue[field.name]
            ) ?? null;
        } else if (field.default != null) {
          selectedValue =
            dropdownOptions.find(
              (option) => option[field.dataItemKey] === field.default
            ) ?? null;
        }
        return {
          ...acc,
          [field.name]: selectedValue ?? field?.default ?? null,
        };
      }

      return {
        ...acc,
        [field.name]:
          editValue?.[field.name] != null
            ? editValue[field.name]
            : field.default != null
            ? field.default
            : '',
      };
    }, {});

    setInitialValues(generatedValues);
  }, [editValue, formField]);
  return (
    <OkForm
      ignoreModified={ignoreModified}
      ref={formRef}
      validator={validatorHandle}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      key={JSON.stringify(initialValues)}
      render={(formRenderProps) => {
        let fromDate = '';
        if (formRenderProps.valueGetter('fromDate')) {
          fromDate = formRenderProps.valueGetter('fromDate');
        }

        return (
          <div>
            <div style={formaStyle} className={formaClassName}>
              {formField
                .filter((items) => items.fieldType !== 'Checkbox')
                .map((items, index) => {
                  if (items.fieldType === 'Button') {
                    return (
                      <div
                        key={index}
                        style={{
                          position: 'relative',
                          top: '25px',

                          gridColumn: items.colSpan
                            ? `${items.colSpan}`
                            : 'span 1',
                        }}
                      >
                        <Button
                          onClick={
                            items.formOnchange == true
                              ? (e) => handleFormButton(e, items.id)
                              : undefined
                          }
                          disabled={
                            typeof items?.disabled === 'boolean'
                              ? items.disabled
                              : false
                          }
                          themeColor='primary'
                          fillMode={'solid'}
                        >
                          {items.label}
                        </Button>
                      </div>
                    );
                  }
                  const FieldComponent = fieldComponents[items.fieldType];
                  const fieldData =
                    items.fieldType === 'Dropdown' ||
                    items.fieldType === 'AutoComplete' ||
                    items.fieldType === 'MultiSelector' ||
                    items.fieldType === 'MultiSelectTree'
                      ? dropdownData[items.name]?.data || items.data || []
                      : items.data;
                  const isDisabled = (() => {
                    if (typeof items.disabled === 'boolean') {
                      return items.disabled;
                    } else if (typeof items.disabled === 'string') {
                      return !!formRenderProps.valueGetter(items.disabled)
                        ?.name;
                    } else if (
                      editValue !== null &&
                      items?.isUpdate !== undefined
                    ) {
                      return !items.isUpdate;
                    } else {
                      return false;
                    }
                  })();

                  return (
                    <div
                      style={{
                        gridColumn: items.colSpan
                          ? `${items.colSpan}`
                          : 'span 1',
                      }}
                      key={index}
                    >
                      <Field
                        id={items.id}
                        name={items.name}
                        component={FieldComponent}
                        label={
                          items.required === true ? (
                            <CustomField label={items.label || ''} />
                          ) : (
                            items.label
                          )
                        }
                        validator={
                          items.type === 'email'
                            ? emailValidator
                            : items.customValidator
                        }
                        data={fieldData}
                        required={
                          items.fieldType == 'Dropdown'
                            ? undefined
                            : items.required
                        }
                        textField={items.textField}
                        defaultItem={items.defaultItem}
                        filterable={true}
                        dataItemKey={items.dataItemKey}
                        onChange={
                          items.formOnchange == true ? formOnchange : undefined
                        }
                        readonly={items.readonly}
                        loading={
                          items.fieldType === 'Dropdown' &&
                          dropdownData[items.name]?.isLoading
                        }
                        props={{
                          ...(items.fieldType === 'Dropdown' ||
                          items.fieldType === 'MultiSelector' ||
                          items.fieldType === 'DatePicker' ||
                          items.fieldType === 'MultiSelectTree'
                            ? {
                                data: fieldData,
                                design: items?.design,
                                format: items?.format,
                              }
                            : items.fieldType === 'CheckFormBox' ||
                              items.fieldType === 'DisableDatePicker'
                            ? {
                                items,
                                fromDate,
                                design: items?.design,
                                format: items?.format,
                              }
                            : {
                                design: items?.design,
                                format: items?.format,
                                items,
                              }),
                        }}
                        note={items.note}
                        defaultValue={items?.value}
                        customHint={items.hint}
                        disabled={isDisabled}
                        type={items.type}
                        restrictions={items.restrictions}
                        rows={items.rows}
                        requiredHint={items.requiredHint}
                        error={formRenderProps.errors[items.name]}
                        width={items.width}
                        max={items.max}
                        min={items.min}
                      />
                    </div>
                  );
                })}

              {/* Checkbox fields in a single row */}
              {formField.filter((items) => items.fieldType === 'Checkbox')
                ?.length !== 0 && (
                <div
                  style={{
                    display: 'flex',
                    gap: '24px',
                    marginTop: '20px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {formField
                    .filter((items) => items.fieldType === 'Checkbox')
                    .map((items, index) => (
                      <Field
                        key={index}
                        id={items.id}
                        name={items.name}
                        component={FormCheckbox}
                        label={items.label}
                      />
                    ))}
                </div>
              )}
            </div>
            {(buttonProps?.isAccessCancelButtonShow ||
              buttonProps?.isAccessSubmitButtonShow) && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6,1fr)',
                  gap: '25px',
                  flexWrap: 'wrap',
                  marginTop: 20,
                  maxWidth: 'auto',
                }}
              >
                {!CancelButtonShow && buttonProps?.isAccessCancelButtonShow && (
                  <Button
                    onClick={() => {
                      handleCustomerClear?.();
                      formRef.current?.resetForm();
                      setInitialValues({});
                      setEditValue?.({});
                      if (setSelectedDropdownData) {
                        setSelectedDropdownData(null);
                      }
                    }}
                    disabled={buttonProps?.isCancelButtonDisabled}
                  >
                    {LABEL_CLEAR}
                  </Button>
                )}

                {!submitButtonShow && buttonProps?.isAccessSubmitButtonShow && (
                  <Button
                    themeColor='primary'
                    disabled={
                      !formRenderProps.allowSubmit ||
                      buttonProps?.isAddButtonDisabled
                    }
                    onClick={formRenderProps.onSubmit}
                  >
                    {editValue == null
                      ? SubmitLabel || LABEL_ADD
                      : SubmitLabel || LABEL_UPDATE}
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}

export default Form;
