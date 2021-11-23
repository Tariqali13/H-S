import React from 'react';
import Select from 'react-select';

type IProps = {
  getOptionLabel: string,
  getOptionValue: string,
  options: Array<any>,
  defaultValue?: Array<any> | any,
  isMulti?: boolean,
  handleChange?: () => void,
  isLoading?: boolean,
  noOptionsMessage?: any,
  isDisabled?: boolean,
  creatableSelectStyles?: any,
  handleInputChange?: () => void,
  handleKeyDown?: () => void,
  inputValue?: string,
  handleBlur?: any,
  isSearchable?: boolean,
  formatOptionLabel?: any,
  onBlur?: () => void,
  onFocus?: () => void,
  blurInputOnSelect?: boolean,
  onMenuOpen?: () => void,
  value?: any,
  placeholder?: any,
  classes?: string,
  ownGetOptionLabel?: (opt: any) => void,
  isMenuOpen?: boolean,
  inputId: string,
}

const ReactSelect = (props: IProps) => {
  const {
    getOptionLabel,
    getOptionValue,
    options,
    defaultValue,
    isMulti,
    handleChange,
    isLoading,
    noOptionsMessage,
    isDisabled,
    creatableSelectStyles,
    handleInputChange,
    isSearchable,
    formatOptionLabel,
    onBlur,
    onFocus,
    blurInputOnSelect,
    onMenuOpen,
    value,
    placeholder,
    ownGetOptionLabel,
    classes,
    inputId,
  } = props;
  const handleFocus = (e: any) => {
    e.target.setAttribute('autocomplete', 'off');
  };
  return (
    <React.Fragment>
      <Select
        isLoading={isLoading}
        isMulti={isMulti}
        value={value || defaultValue}
        defaultValue={defaultValue}
        options={options}
        isDisabled={isDisabled}
        blurInputOnSelect={blurInputOnSelect}
        onFocus={e => {
          if (onFocus) {
            onFocus();
          }
          handleFocus(e);
        }}
        onBlur={onBlur}
        onMenuOpen={onMenuOpen}
        // menuIsOpen={false}
        onInputChange={handleInputChange}
        formatOptionLabel={formatOptionLabel}
        style={creatableSelectStyles}
        getOptionValue={opt => opt[getOptionValue]}
        getOptionLabel={opt => (
          ownGetOptionLabel ? ownGetOptionLabel(opt) : opt[getOptionLabel])
        }
        inputId={inputId}
        noOptionsMessage={noOptionsMessage}
        isSearchable={isSearchable}
        onChange={handleChange}
        classNamePrefix="select"
        placeholder={placeholder}
        inputProps={{ autoComplete: 'off', autoFill: 'off' }}
        className={`react-msd rt-themeselectdropdown ${classes}`}
        // styles={customStyles}
      />
    </React.Fragment>
  );
};

export default ReactSelect;
