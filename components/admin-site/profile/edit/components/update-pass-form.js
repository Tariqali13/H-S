import React from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  FormFeedback,
  Spinner,
} from "reactstrap";
import {Field} from 'formik';
import {fieldValidateBool} from "@/components/utils/form";

type Props = {
  values: any,
  errors: any,
  dirty: boolean,
  isSubmitting: boolean,
  handleChange: Function,
  handleBlur: Function,
  handleSubmit: Function,
  isLoadingSave: boolean,
  isView: boolean,
  buttonText: string,
};

const UpdatePassForm = (props: Props) => {
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isLoadingSave,
    isView,
    buttonText,
  } = props;
  return (
    <Form>
      <h6 className="heading-small text-muted mb-4 mt-4">
        Password
      </h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="4">
            <Field name="old_password">
              {({field, form}) => {
                return (
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Old Password
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder=" "
                      type="text"
                      name="old_password"
                      disabled={isView || isLoadingSave}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.old_password}
                      invalid={fieldValidateBool(field, form)}
                    />
                    {fieldValidateBool(field, form) && (
                      <FormFeedback>
                        {errors.old_password}
                      </FormFeedback>
                    )}
                  </FormGroup>
                );
              }}
            </Field>
          </Col>
          <Col lg="4">
            <Field name="password">
              {({field, form}) => {
                return (
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Password
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder=" "
                      type="text"
                      name="password"
                      disabled={isView || isLoadingSave}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      invalid={fieldValidateBool(field, form)}
                    />
                    {fieldValidateBool(field, form) && (
                      <FormFeedback>
                        {errors.password}
                      </FormFeedback>
                    )}
                  </FormGroup>
                );
              }}
            </Field>
          </Col>
          <Col lg="4">
            <Field name="confirm_password">
              {({field, form}) => {
                return (
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Confirm Password
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder=" "
                      type="text"
                      name="confirm_password"
                      disabled={isView || isLoadingSave}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirm_password}
                      invalid={fieldValidateBool(field, form)}
                    />

                    {fieldValidateBool(field, form) && (
                      <FormFeedback>
                        {errors.confirm_password}
                      </FormFeedback>
                    )}
                  </FormGroup>
                );
              }}
            </Field>
          </Col>
        </Row>
      </div>
      {!isView && (
        <Button
          className="btn-icon btn-3 my-4"
          color="primary float-right"
          type="button"
          disabled={!dirty || isSubmitting || isLoadingSave}
          onClick={handleSubmit}
        >
          <span className="btn-inner--text">
            {buttonText || 'Create'}
          </span>
          <span className="btn-inner--icon">
            {(isSubmitting || isLoadingSave) && <Spinner size="sm"/>}
          </span>
        </Button>
      )}
    </Form>
  );
};

export { UpdatePassForm };