import React from 'react';
import {Field} from "formik";
import {fieldValidateBool, fieldValidate} from "@/utils/form";
import { SpinnerCircular } from 'spinners-react';

type Props = {
    values: any,
    errors: any,
    dirty: boolean,
    isSubmitting: boolean,
    handleChange: Function,
    handleBlur: Function,
    handleSubmit: Function,
    isLoadingSave: boolean,
};

const ContactForm = (props: Props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoadingSave,
  } = props;
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
      <Field name="subject">
        {({field, form}) => {
          return (
            <span className={fieldValidate(field, form)}>
              <label className="form-label">{fieldValidateBool(field, form) ? errors.subject : "Subject"}</label>
              <input
                className="form-input"
                type="text"
                name="subject"
                placeholder="Your Subject"
                required={true}
                disabled={isLoadingSave}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.subject}
              />
            </span>
          );
        }}
      </Field>
      <Field name="message">
        {({field, form}) => {
          return (
            <span className={fieldValidate(field, form)}>
              <label className="form-label">{fieldValidateBool(field, form) ? errors.message : "Message"}</label>
              <textarea
                className="form-input"
                name="message"
                placeholder="Your Message"
                required={true}
                disabled={isLoadingSave}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
            </span>
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
              Submit Now
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

export { ContactForm };