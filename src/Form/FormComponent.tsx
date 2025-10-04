/** @format */

import {
  DateTimePicker,
  DatePicker,
  Calendar,
  CalendarCell,
  CalendarCellProps,
  CalendarProps,
} from '@progress/kendo-react-dateinputs';
import {
  AutoComplete,
  ComboBox,
  ComboBoxFilterChangeEvent,
  DropDownList,
  DropDownListFilterChangeEvent,
  MultiSelect,
  MultiSelectTree,
  MultiSelectTreeChangeEvent,
  MultiSelectTreeExpandEvent,
  MultiSelectTreeFilterChangeEvent,
  getMultiSelectTreeValue,
} from '@progress/kendo-react-dropdowns';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import {
  Input,
  MaskedTextBox,
  InputPrefix,
  Checkbox,
  TextArea,
  NumericTextBox,
  TextBox,
  CheckboxChangeEvent,
} from '@progress/kendo-react-inputs';
import React, { useEffect, useRef, useState } from 'react';
import { Label, Hint, Error } from '@progress/kendo-react-labels';
import { filterBy, FilterDescriptor } from '@progress/kendo-data-query';
import {
  Upload,
  ExternalDropZone,
  UploadOnAddEvent,
  UploadOnRemoveEvent,
} from '@progress/kendo-react-upload';
import { LABEL_STAR } from '../constants/Common';
import { OkButton } from 'elab_components';
import { eyeIcon, eyeSlashIcon } from '@progress/kendo-svg-icons';
import {
  expandedState,
  processMultiSelectTreeData,
} from '../Form/multiselectionTree';

const checkField = 'checkField';
const checkIndeterminateField = 'checkIndeterminateField';
const subItemsField = 'items';
const expandField = 'expanded';
const textField = 'name';

const fields = {
  checkField,
  checkIndeterminateField,
  expandField,
  subItemsField,
};

export function FormComponent() {
  const uploadRef = React.createRef<Upload>();
  const FormDividedInput = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      type,
      optional,
      value,
      props,
      wrapperStyle,
      ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        {label !== '' && (
          <Label
            editorId={id}
            editorDisabled={disabled}
            optional={optional}
            className='k-form-label'
          >
            {label}
          </Label>
        )}
        <div style={{ display: 'block' }}>
          <div
            className={'k-form-field-wrap'}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <Input
              valid={valid}
              type={type}
              id={id}
              value={value}
              disabled={disabled}
              ariaDescribedBy={`${hintId} ${errorId}`}
              style={{ width: '50%' }}
              {...others}
            />
            /
            <Input
              valid={valid}
              type={type}
              id={id}
              value={value}
              disabled={disabled}
              style={{ width: '50%' }}
              ariaDescribedBy={`${hintId} ${errorId}`}
              {...others}
            />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && (
              <Error id={errorId}>{validationMessage}</Error>
            )}
          </div>
        </div>
      </FieldWrapper>
    );
  };
  const FormInput = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      type,
      optional,
      value,
      props,
      wrapperStyle,
      width,
      ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        {label !== '' && (
          <Label
            editorId={id}
            editorDisabled={disabled}
            optional={optional}
            className='k-form-label'
            style={
              props?.design === 'row' && label !== 'Balance'
                ? {
                    minWidth: '68px',
                  }
                : {}
            }
          >
            {label}
          </Label>
        )}
        <div
          style={{
            display: 'block',
            width: width && width !== '' ? width : '-webkit-fill-available',
          }}
        >
          <div className={'k-form-field-wrap'}>
            <Input
              valid={valid}
              type={type}
              id={id}
              style={{
                width: width && width !== '' ? width : '-webkit-fill-available',
              }}
              value={value}
              disabled={disabled}
              ariaDescribedBy={`${hintId} ${errorId}`}
              {...others}
            />
            {showHint && <Hint id={hintId}>{hint}</Hint>}
            {showValidationMessage && (
              <Error id={errorId}>{validationMessage}</Error>
            )}
          </div>
        </div>
      </FieldWrapper>
    );
  };
  const FormMaskedInputWithCountryCode = (
    fieldRenderProps: FieldRenderProps
  ) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      type,
      mask,
      optional,
      value,
      contryCode,
      props,
      wrapperStyle,
      ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        {label !== '' && (
          <Label
            editorId={id}
            editorValid={valid}
            editorDisabled={disabled}
            optional={optional}
            className='k-form-label'
          >
            {label}
          </Label>
        )}
        <div className={'k-form-field-wrap'}>
          <MaskedTextBox
            valid={valid}
            mask={mask}
            id={id}
            prefix={() => (
              <InputPrefix orientation='horizontal'>({contryCode})</InputPrefix>
            )}
            value={value}
            disabled={disabled}
            ariaDescribedBy={`${hintId} ${errorId}`}
            {...others}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };

  const FormDateTimePicker = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      min,
      wrapperStyle,
      value,
      props,
      ...others
    } = fieldRenderProps;

    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';
    const labelId: string = label ? `${id}_label` : '';
    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <Label
          id={labelId}
          editorId={id}
          editorDisabled={disabled}
          className='k-form-label'
        >
          {label}
        </Label>
        <div className={'k-form-field-wrap'}>
          <DateTimePicker
            ariaLabelledBy={labelId}
            ariaDescribedBy={`${hintId} ${errorId}`}
            valid={valid}
            id={id}
            min={min}
            defaultValue={value}
            disabled={disabled}
            {...others}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };

  const FormDatePicker = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      min,
      wrapperStyle,
      value,
      defaultValue,
      dateRule,
      props,
      ...others
    } = fieldRenderProps;

    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';
    const labelId: string = label ? `${id}_label` : '';

    const dateValue =
      typeof value === 'string'
        ? value === ''
          ? null
          : new Date(value)
        : value;

    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <Label
          id={labelId}
          editorId={id}
          editorDisabled={disabled}
          className='k-form-label'
        >
          {label}
        </Label>
        <div className={'k-form-field-wrap'}>
          <DatePicker
            placeholder='MM/DD/YYYY'
            ariaLabelledBy={labelId}
            ariaDescribedBy={`${hintId} ${errorId}`}
            valid={valid}
            id={id}
            min={min}
            format={'dd-MMM-yyyy'}
            value={dateValue ?? defaultValue}
            defaultValue={value}
            disabled={disabled}
            {...others}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };
  const FormDisableLogicDatePicker = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      min,
      wrapperStyle,
      value,
      defaultValue,
      dateRule,
      items,
      props,
      fromDate,
      ...others
    } = fieldRenderProps;
    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';
    const labelId: string = label ? `${id}_label` : '';

    const dateValue =
      typeof value === 'string'
        ? value === ''
          ? null
          : new Date(value)
        : value;
    const getCustomCell = (rule: string, fromDateProp: Date) => {
      return (props: CalendarCellProps) => {
        const d = props.value;
        if (!d) return <CalendarCell {...props} />;

        if (rule === 'first') {
          return <CalendarCell {...props} isDisabled={d.getDate() !== 1} />;
        }

        if (rule === 'last') {
          const start = !fromDateProp ? new Date() : new Date(fromDateProp);
          const end = new Date(start);
          end.setFullYear(end.getFullYear() + 1);

          if (d < start || d > end) {
            return <CalendarCell {...props} isDisabled={true} />;
          }

          const lastDayOfMonth = new Date(
            d.getFullYear(),
            d.getMonth() + 1,
            0
          ).getDate();

          return (
            <CalendarCell
              {...props}
              isDisabled={d.getDate() !== lastDayOfMonth}
            />
          );
        }

        return <CalendarCell {...props} />;
      };
    };

    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <Label
          id={labelId}
          editorId={id}
          editorDisabled={disabled}
          className='k-form-label'
        >
          {label}
        </Label>
        <div className={'k-form-field-wrap'}>
          <DatePicker
            placeholder='MM/DD/YYYY'
            ariaLabelledBy={labelId}
            ariaDescribedBy={`${hintId} ${errorId}`}
            valid={valid}
            id={id}
            min={min}
            format={'dd-MMM-yyyy'}
            value={dateValue ?? defaultValue}
            defaultValue={value}
            disabled={disabled}
            calendar={(p: CalendarProps) => (
              <Calendar
                {...p}
                cell={getCustomCell(props.items.dateRule, props?.fromDate)}
              />
            )}
            {...others}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };

  const FormCheckbox = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      id,
      valid,
      disabled,
      hint,
      optional,
      label,
      onChange,
      visited,
      modified,
      value,
      props,
      wrapperStyle,
      ...others
    } = fieldRenderProps;

    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';
    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <div className={'k-form-field-wrap'}>
          <Checkbox
            ariaDescribedBy={`${hintId} ${errorId}`}
            label={label}
            labelOptional={optional}
            valid={valid}
            id={id}
            disabled={disabled}
            onChange={onChange}
            checked={value}
            labelClassName='k-form-label'
            {...others}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };

  const FormCheckboxInside = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      type,
      optional,
      value,
      onChange,
      props,
      wrapperStyle,
      ...others
    } = fieldRenderProps;
    const { items } = props;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const handleInputChange = (event: CheckboxChangeEvent) => {
      const { name, value } = event.target;
    };
    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <Checkbox id='ch' name={'checkbox'} onChange={onChange}>
          <Label
            className='k-checkbox-label'
            style={{ display: 'inline-block' }}
            editorId='ch'
          >
            {items.label}
          </Label>
        </Checkbox>
      </FieldWrapper>
    );
  };
  const FormTextArea = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      hint,
      rows,
      disabled,
      optional,
      value,
      props,
      wrapperStyle,
      ...others
    } = fieldRenderProps;

    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';

    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <Label editorId={id} optional={optional} className='k-form-label'>
          {label}
        </Label>
        <div className={'k-form-field-wrap'}>
          <TextArea
            valid={valid}
            value={value}
            autoSize={true}
            rows={rows}
            id={id}
            disabled={disabled}
            ariaDescribedBy={`${hintId} ${errorId}`}
            {...others}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };

  const FormDropDownList = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      value,
      modified,
      wrapperStyle,
      name,
      onChange,
      data,
      formRenderProps,
      dataItemKey,
      props,
      width,
      ...other
    } = fieldRenderProps;
    const [FilteredData, setFilteredData] = useState<Array<string | number>>(
      []
    );

    useEffect(() => {
      setFilteredData(data);
    }, [data]);

    const editorRef = useRef(null);
    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';
    const labelId: string = label ? `${id}_label` : '';

    const onFilterChange = (event: DropDownListFilterChangeEvent) => {
      setFilteredData(filterBy(data, event?.filter));
    };
    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        {label !== '' && (
          <Label
            className='input-labels'
            id={labelId}
            editorRef={editorRef}
            editorId={id}
            editorValid={valid}
            style={
              props?.design === 'row' && label !== 'Balance'
                ? {
                    minWidth: '68px',
                  }
                : {}
            }
          >
            {label}
          </Label>
        )}
        <DropDownList
          ariaLabelledBy={labelId}
          ariaDescribedBy={`${hintId} ${errorId}`}
          id={id}
          disabled={disabled}
          onChange={onChange}
          value={value}
          style={{ width: width ? width : '-webkit-fill-available' }}
          className={
            props?.design === 'row' ? 'drop-custom-row' : 'drop-custom-column'
          }
          onFilterChange={onFilterChange}
          filterable={true}
          data={FilteredData}
          dataItemKey={dataItemKey}
          {...other}
          name={name}
        />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && (
          <Error id={errorId}>{validationMessage}</Error>
        )}
      </FieldWrapper>
    );
  };

  const FormUpload = (fieldRenderProps: FieldRenderProps) => {
    const {
      value,
      id,
      optional,
      label,
      hint,
      customHint,
      validationMessage,
      touched,
      note,
      requiredHint,
      props,
      wrapperStyle,
      ...others
    } = fieldRenderProps;

    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';
    const labelId: string = label ? `${id}_label` : '';

    const onChangeHandler = (event: UploadOnAddEvent) => {
      fieldRenderProps.onChange({ value: event.newState });
    };
    const onRemoveHandler = (event: UploadOnRemoveEvent) => {
      fieldRenderProps.onChange({ value: event.newState });
    };

    const CustomField = ({ label }: { label: string }) => (
      <div className='form-group'>
        <label>
          <span>{label}</span>
          <span style={{ color: 'red' }}> {LABEL_STAR}</span>
        </label>
      </div>
    );

    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <Label
          id={labelId}
          editorId={id}
          optional={optional}
          className='k-form-label'
        >
          {label}
        </Label>
        <ExternalDropZone
          style={{
            borderRadius: '10px 10px 0px 0px',
            borderStyle: 'dashed',
            borderBottom: 'none',
            borderColor: showValidationMessage ? '#dc3545' : '',
          }}
          uploadRef={uploadRef}
          customHint={
            requiredHint === true ? (
              <CustomField label={customHint} />
            ) : (
              customHint
            )
          }
          customNote={note}
        />
        <div className={'k-form-field-wrap'}>
          <Upload
            className={showValidationMessage ? 'k-upload-validation' : ''}
            id={id}
            defaultFiles={[]}
            autoUpload={false}
            showActionButtons={false}
            multiple={false}
            files={value}
            onAdd={onChangeHandler}
            onRemove={onRemoveHandler}
            ariaDescribedBy={`${hintId} ${errorId}`}
            ariaLabelledBy={labelId}
            {...others}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };

  const FormAutoComplete = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      wrapperStyle,
      dataItemKey,
      value,
      props,
      ...others
    } = fieldRenderProps;
    const editorRef = React.useRef<any>(null);

    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';
    const labelId: string = label ? `${id}_label` : '';

    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <Label
          id={labelId}
          editorRef={editorRef}
          editorId={id}
          editorValid={valid}
          editorDisabled={disabled}
          className='k-form-label'
        >
          {label}
        </Label>
        <div className={'k-form-field-wrap'}>
          <AutoComplete
            ariaLabelledBy={labelId}
            ariaDescribedBy={`${hintId} ${errorId}`}
            ref={editorRef}
            dataItemKey={dataItemKey}
            valid={valid}
            id={id}
            value={value}
            disabled={disabled}
            {...others}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };

  const FormNumericTextBox = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      value,
      props,
      wrapperStyle,
      ...others
    } = fieldRenderProps;

    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';

    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: label === 'Balance' ? '10px' : 0,
              }
            : wrapperStyle
        }
      >
        <Label
          editorId={id}
          editorValid={valid}
          editorDisabled={disabled}
          className='k-form-label'
          style={
            props?.design === 'row' && label !== 'Balance'
              ? {
                  minWidth: '68px',
                }
              : {}
          }
        >
          {label}
        </Label>
        <div className={'k-form-field-wrap'}>
          <NumericTextBox
            ariaDescribedBy={`${hintId} ${errorId}`}
            valid={valid}
            id={id}
            format={props?.format ?? '#'}
            disabled={disabled}
            {...others}
            value={value}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
        <>{label === 'Balance' && 'INR'}</>
      </FieldWrapper>
    );
  };

  const FormComboBox = (fieldRenderProps: FieldRenderProps) => {
    const {
      data,
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      wrapperStyle,
      props,
      ...others
    } = fieldRenderProps;

    const [FilteredData, setFilteredData] = useState<Array<string | number>>(
      []
    );

    useEffect(() => {
      setFilteredData(data);
    }, [data]);

    const editorRef = React.useRef<any>(null);

    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    const hintId: string = showHint ? `${id}_hint` : '';
    const errorId: string = showValidationMessage ? `${id}_error` : '';
    const labelId: string = label ? `${id}_label` : '';

    const onFilterChange = (event: ComboBoxFilterChangeEvent) => {
      setFilteredData(filterBy(data, event?.filter));
    };

    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <Label
          id={labelId}
          editorRef={editorRef}
          editorId={id}
          editorValid={valid}
          editorDisabled={disabled}
          className='k-form-label'
        >
          {label}
        </Label>
        <div className={'k-form-field-wrap'}>
          <ComboBox
            ariaLabelledBy={labelId}
            ariaDescribedBy={`${hintId} ${errorId}`}
            ref={editorRef}
            data={FilteredData}
            filterable={true}
            onFilterChange={onFilterChange}
            valid={valid}
            id={id}
            disabled={disabled}
            {...others}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };
  const FormMultiSelect = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      wrapperStyle,
      props,
      ...others
    } = fieldRenderProps;
    const editorRef = React.useRef(null);
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';
    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <Label
          id={labelId}
          editorRef={editorRef}
          editorId={id}
          editorValid={valid}
          editorDisabled={disabled}
          className='k-form-label'
        >
          {label}
        </Label>
        <div className={'k-form-field-wrap'}>
          <MultiSelect
            ariaLabelledBy={labelId}
            ariaDescribedBy={`${hintId} ${errorId}`}
            ref={editorRef}
            valid={valid}
            id={id}
            disabled={disabled}
            {...others}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };

  const FormMultiSelectTree = (fieldRenderProps: FieldRenderProps) => {
    const {
      value,
      onChange,
      label,
      hint,
      validationMessage,
      touched,
      id,
      data,
      props,
      wrapperStyle,
      dataItemKey,
    } = fieldRenderProps;
    const [treeDataSource, setTreeDataSource] = useState<any[]>([]);
    const [expanded, setExpanded] = useState<any[]>([]);
    const [filter, setFilter] = React.useState<FilterDescriptor | null>(null);

    useEffect(() => {
      if (data?.length) {
        setTreeDataSource(data);
        // Optionally expand all top-level nodes
        setExpanded(data.map((item: any) => item[dataItemKey]));
      }
    }, [data, dataItemKey]);

    const handleChange = (event: MultiSelectTreeChangeEvent) => {
      onChange?.({
        value: getMultiSelectTreeValue(treeDataSource, {
          ...fields,
          dataItemKey,
          ...event,
          value,
        }),
      });
    };

    const onExpandChange = React.useCallback(
      (event: MultiSelectTreeExpandEvent) =>
        setExpanded(expandedState(event.item, dataItemKey, expanded)),
      [expanded, dataItemKey]
    );

    const treeData = React.useMemo(
      () =>
        processMultiSelectTreeData(data, {
          expanded,
          value,
          filter,
          ...fields,
          dataItemKey,
        }),
      [expanded, value, filter]
    );
    const onFilterChange = (event: MultiSelectTreeFilterChangeEvent) =>
      setFilter(event.filter);
    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <MultiSelectTree
          id={id}
          style={{ width: '300px' }}
          data={treeData}
          value={value || []}
          onChange={handleChange}
          onExpandChange={onExpandChange}
          dataItemKey={dataItemKey}
          checkField={checkField}
          checkIndeterminateField={checkIndeterminateField}
          subItemsField={subItemsField}
          expandField={expandField}
          textField={textField}
          label={label}
          placeholder='Please select ...'
          filterable={true}
          onFilterChange={onFilterChange}
        />
        {hint && <div className='k-form-hint'>{hint}</div>}
        {touched && validationMessage && (
          <div className='k-form-error'>{validationMessage}</div>
        )}
      </FieldWrapper>
    );
  };

  const AddItemButton = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      id,
      valid,
      disabled,
      hint,
      optional,
      label,
      onChange,
      visited,
      modified,
      value,
      props,
      wrapperStyle,
      ...others
    } = fieldRenderProps;

    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <div className={'k-form-field-wrap'}>
          <OkButton
            onClick={(e: any) => onChange(fieldRenderProps)}
            type='button'
            style={{
              background: 'transparent',
              borderColor: 'transparent',
              color: 'black',
            }}
            {...fieldRenderProps}
            className='button-form-add-item'
          >
            Add Item
            <svg
              width='23'
              height='23'
              viewBox='0 0 26 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.5 1C10.2255 1 8.00211 1.67446 6.11095 2.9381C4.21978 4.20174 2.7458 5.99779 1.87539 8.09914C1.00498 10.2005 0.777244 12.5128 1.22097 14.7435C1.6647 16.9743 2.75997 19.0234 4.36828 20.6317C5.97658 22.24 8.02568 23.3353 10.2565 23.779C12.4872 24.2228 14.7995 23.995 16.9009 23.1246C19.0022 22.2542 20.7983 20.7802 22.0619 18.8891C23.3255 16.9979 24 14.7745 24 12.5C23.9967 9.45102 22.784 6.52787 20.6281 4.37191C18.4721 2.21596 15.549 1.0033 12.5 1ZM16.3333 13.4583H13.4583V16.3333C13.4583 16.5875 13.3574 16.8313 13.1776 17.011C12.9979 17.1907 12.7542 17.2917 12.5 17.2917C12.2458 17.2917 12.0021 17.1907 11.8224 17.011C11.6426 16.8313 11.5417 16.5875 11.5417 16.3333V13.4583H8.66667C8.4125 13.4583 8.16875 13.3574 7.98903 13.1776C7.8093 12.9979 7.70834 12.7542 7.70834 12.5C7.70834 12.2458 7.8093 12.0021 7.98903 11.8224C8.16875 11.6426 8.4125 11.5417 8.66667 11.5417H11.5417V8.66667C11.5417 8.4125 11.6426 8.16874 11.8224 7.98902C12.0021 7.8093 12.2458 7.70833 12.5 7.70833C12.7542 7.70833 12.9979 7.8093 13.1776 7.98902C13.3574 8.16874 13.4583 8.4125 13.4583 8.66667V11.5417H16.3333C16.5875 11.5417 16.8313 11.6426 17.011 11.8224C17.1907 12.0021 17.2917 12.2458 17.2917 12.5C17.2917 12.7542 17.1907 12.9979 17.011 13.1776C16.8313 13.3574 16.5875 13.4583 16.3333 13.4583Z'
                fill='#004468'
              />
            </svg>
          </OkButton>
        </div>
      </FieldWrapper>
    );
  };
  const TrashButton = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      id,
      valid,
      disabled,
      hint,
      optional,
      label,
      onChange,
      visited,
      modified,
      value,
      props,
      wrapperStyle,
      ...others
    } = fieldRenderProps;

    const showValidationMessage: string | false | null =
      touched && validationMessage;
    const showHint: boolean = !showValidationMessage && hint;
    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <div className={'k-form-field-wrap'}>
          <OkButton
            onClick={(e: any) => onChange(fieldRenderProps)}
            type='button'
            style={{
              background: 'transparent',
              borderColor: 'transparent',
              color: 'black',
              top: '13px',
            }}
            {...fieldRenderProps}
            className='button-form-add-item'
          >
            <svg
              width='25'
              height='29'
              viewBox='0 0 25 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.79102 28.375C3.9431 28.375 3.21723 28.0731 2.61341 27.4693C2.00959 26.8655 1.70768 26.1396 1.70768 25.2917V5.25H0.166016V2.16667H7.87435V0.625H17.1243V2.16667H24.8327V5.25H23.291V25.2917C23.291 26.1396 22.9891 26.8655 22.3853 27.4693C21.7815 28.0731 21.0556 28.375 20.2077 28.375H4.79102ZM20.2077 5.25H4.79102V25.2917H20.2077V5.25ZM7.87435 22.2083H10.9577V8.33333H7.87435V22.2083ZM14.041 22.2083H17.1243V8.33333H14.041V22.2083Z'
                fill='#B5B5B5'
              />
            </svg>
          </OkButton>
        </div>
      </FieldWrapper>
    );
  };

  const FormInputPassword = (fieldRenderProps: FieldRenderProps) => {
    const {
      validationMessage,
      touched,
      label,
      id,
      valid,
      disabled,
      hint,
      type,
      optional,
      props,
      wrapperStyle,
      ...others
    } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const [textboxType, setTextboxType] = React.useState(type);
    const [iconName, setIconName] = React.useState(eyeIcon);

    const handleClick = () => {
      setTextboxType(textboxType === 'password' ? 'text' : 'password');
      setIconName(iconName === eyeIcon ? eyeSlashIcon : eyeIcon);
    };

    return (
      <FieldWrapper
        style={
          props?.design === 'row'
            ? {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }
            : wrapperStyle
        }
      >
        <Label
          editorId={id}
          editorDisabled={disabled}
          optional={optional}
          className='k-form-label'
        >
          {label}
        </Label>
        <div className={'k-form-field-wrap form-password'}>
          <TextBox
            valid={valid}
            id={id}
            type={textboxType}
            disabled={disabled}
            style={{ height: '100%' }}
            {...others}
            suffix={() => (
              <OkButton
                svgIcon={iconName}
                onClick={handleClick}
                fillMode='flat'
              />
            )}
          />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && (
            <Error id={errorId}>{validationMessage}</Error>
          )}
        </div>
      </FieldWrapper>
    );
  };

  return {
    FormDropDownList,
    FormInput,
    FormDateTimePicker,
    FormCheckbox,
    FormTextArea,
    FormDatePicker,
    FormDisableLogicDatePicker,
    FormMaskedInputWithCountryCode,
    FormUpload,
    FormAutoComplete,
    FormNumericTextBox,
    AddItemButton,
    TrashButton,
    FormComboBox,
    FormMultiSelect,
    FormInputPassword,
    FormMultiSelectTree,
    FormCheckboxInside,
    FormDividedInput,
  };
}
