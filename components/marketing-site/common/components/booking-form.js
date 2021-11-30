import React from 'react';
import {Field} from "formik";
import {fieldValidateBool, fieldValidate} from "@/utils/form";
import { SpinnerCircular } from 'spinners-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {City, State} from "country-state-city";
import ReactSelect from "@/components/react-select";
import _get from "lodash.get";
import {billRangeOptions, creditScoreOptions} from "@/constants/booking";

type Props = {
    values: any,
    errors: any,
    dirty: boolean,
    isSubmitting: boolean,
    handleChange: Function,
    handleBlur: Function,
    handleSubmit: Function,
    isLoadingSave: boolean,
    productsData: any,
    isLoading: boolean,
    isFetching: boolean,
};

const BookingForm = (props: Props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoadingSave,
    productsData,
    isLoading,
    isFetching,
  } = props;
  const states = State.getStatesOfCountry('US');
  const cities = City.getCitiesOfState('US', values.state);
  return (
    <form action="#" method="post">
      <Field name="full_name">
        {({field, form}) => {
          return (
            <span className={fieldValidate(field, form)}>
              <label className="form-label">{fieldValidateBool(field, form) ? errors.full_name : "Name"}</label>
              <input
                className="form-input"
                type="text"
                name="full_name"
                placeholder="Your name"
                required={true}
                disabled={isLoadingSave}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.full_name}
              />
            </span>
          );
        }}
      </Field>
      <Field name="email">
        {({field, form}) => {
          return (
            <span className={fieldValidate(field, form)}>
              <label className="form-label">{fieldValidateBool(field, form) ? errors.email : "Email"}</label>
              <input
                className="form-input"
                type="text"
                name="email"
                placeholder="Your Email"
                required={true}
                disabled={isLoadingSave}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </span>
          );
        }}
      </Field>
      <Field name="phone_number">
        {({field, form}) => {
          return (
            <div className={fieldValidate(field, form)}  style={{marginBottom: "14px"}}>
              <label className="form-label">{fieldValidateBool(field, form) ? errors.phone_number : "Phone Number"}</label>
              <PhoneInput
                inputStyle={{
                  width: '100%',
                  marginBottom: "14px !important",
                }}
                inputClass="form-input"
                country={'us'}
                value={values.phone_number}
                onChange={value =>
                  form.setFieldValue(field.name, value)
                }
                onBlur={handleBlur}
                disabled={isLoadingSave}
                onlyCountries={['us']}
              />
            </div>
          );
        }}
      </Field>
      <Field name="state">
        {({field, form}) => {
          return (
            <div className={fieldValidate(field, form)}  style={{ marginBottom: "14px" }}>
              <label className="form-label">{fieldValidateBool(field, form) ? errors.state : "State"}</label>
              <ReactSelect
                isMulti={false}
                isCreateable={false}
                defaultValue={values.stateObj}
                isDisabled={isLoadingSave}
                options={states || []}
                getOptionLabel="name"
                getOptionValue="isoCode"
                isSearchable={false}
                placeholder="Select State"
                handleChange={value => {
                  form.setFieldValue(
                    field.name, value.isoCode, true,
                  );
                  form.setFieldValue(
                    "stateObj", value, true,
                  );
                  form.setFieldValue(
                    "cityObj", {}, true,
                  );
                  form.setFieldValue(
                    "city", "", true,
                  );
                }}
                handleBlur={handleBlur}
                // isLoading={isUserDataLoading}
                classes="react-msd"
                noOptionsMessage={() => (
                  <div className="no-results">
                           No States found
                  </div>
                )}
              />
            </div>
          );
        }}
      </Field>
      <Field name="city">
        {({field, form}) => {
          return (
            <div className={fieldValidate(field, form)} style={{ marginBottom: "14px" }}>
              <label className="form-label">{fieldValidateBool(field, form) ? errors.city : "City"}</label>
              <ReactSelect
                isMulti={false}
                isCreateable={false}
                defaultValue={values.cityObj}
                isDisabled={isLoadingSave}
                options={cities || []}
                getOptionLabel="name"
                getOptionValue="name"
                isSearchable={false}
                placeholder="Select City"
                handleChange={value => {
                  form.setFieldValue(
                    field.name, value.name, true,
                  );
                  form.setFieldValue(
                    "cityObj", value, true,
                  );
                }}
                handleBlur={handleBlur}
                // isLoading={isUserDataLoading}
                classes="react-msd"
                noOptionsMessage={() => (
                  <div className="no-results">
                      No City found
                  </div>
                )}
              />
            </div>
          );
        }}
      </Field>
      <Field name="address">
        {({field, form}) => {
          return (
            <span className={fieldValidate(field, form)}>
              <label className="form-label">{fieldValidateBool(field, form) ? errors.address : "Address"}</label>
              <input
                className="form-input"
                type="text"
                name="address"
                placeholder="Your Address"
                required={true}
                disabled={isLoadingSave}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
            </span>
          );
        }}
      </Field>
      <Field name="product_id">
        {({field, form}) => {
          return (
            <div className={fieldValidate(field, form)} style={{ marginBottom: "14px" }}>
              <label className="form-label">{fieldValidateBool(field, form) ? errors.product_id : "Product"}</label>
              <ReactSelect
                isMulti={false}
                isCreateable={false}
                isDisabled={isLoadingSave}
                isLoading={isLoading || isFetching}
                defaultValue={values.product_id}
                options={_get(productsData, 'data', [])}
                getOptionLabel="title"
                getOptionValue="_id"
                isSearchable={false}
                placeholder="Select Product"
                handleChange={value => {
                  form.setFieldValue(
                    field.name, value, true,
                  );
                }}
                handleBlur={handleBlur}
                classes="react-msd"
                noOptionsMessage={() => (
                  <div className="no-results">
                                    No Products found
                  </div>
                )}
              />
            </div>
          );
        }}
      </Field>
      <Field name="bill_range">
        {({field, form}) => {
          return (
            <div className={fieldValidate(field, form)} style={{ marginBottom: "14px" }}>
              <label className="form-label">
                {fieldValidateBool(field, form) ? errors.bill_range.id : "Monthly Utility Bill Range"}
              </label>
              <ReactSelect
                isMulti={false}
                isCreateable={false}
                isDisabled={isLoadingSave}
                defaultValue={values.bill_range}
                options={billRangeOptions}
                getOptionLabel="value"
                getOptionValue="id"
                isSearchable={false}
                placeholder="Select Bill Range"
                handleChange={value => {
                  form.setFieldValue(
                    field.name, value, true,
                  );
                }}
                handleBlur={handleBlur}
                classes="react-msd"
                noOptionsMessage={() => (
                  <div className="no-results">
                      No Bill Range found
                  </div>
                )}
              />
            </div>
          );
        }}
      </Field>
      <Field name="credit_score">
        {({field, form}) => {
          return (
            <div className={fieldValidate(field, form)} style={{ marginBottom: "14px" }}>
              <label className="form-label">
                {fieldValidateBool(field, form) ? errors.credit_score.id : "Is Credit Score 650 or higher"}
              </label>
              <ReactSelect
                isMulti={false}
                isCreateable={false}
                isDisabled={isLoadingSave}
                defaultValue={values.credit_score}
                options={creditScoreOptions}
                getOptionLabel="name"
                getOptionValue="id"
                isSearchable={false}
                placeholder="Is your Credit Score 650 or higher? "
                handleChange={value => {
                  form.setFieldValue(
                    field.name, value, true,
                  );
                }}
                handleBlur={handleBlur}
                classes="react-msd"
              />
            </div>
          );
        }}
      </Field>
      <div className="form-wrap form-button offset-1">
        <button
          type="button"
          className="button button-block
           button-primary-outline button-submit"
          disabled={!dirty || isSubmitting || isLoadingSave}
          onClick={handleSubmit}
        >
          <span className="form-loading-button">
            <span className="form-button-text">
              Book Now
            </span>
            {isSubmitting || isLoadingSave && (
              <SpinnerCircular size={20} сolor="#d7b8c0" thickness={200}/>
            )}
          </span>
        </button>
      </div>
    </form>
  );
};

export { BookingForm };