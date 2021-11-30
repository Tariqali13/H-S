import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  FormFeedback, Spinner,
} from "reactstrap";
import {Field} from 'formik';
import {fieldValidateBool} from "@/components/utils/form";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { State, City }  from 'country-state-city';
import ReactSelect from "@/components/react-select";
import "react-datepicker/dist/react-datepicker.css";
import {GET_ALL_PRODUCTS} from "@/adminSite/products/queries";
import {useQuery} from "react-query";
import reactQueryConfig from "@/constants/react-query-config";
import _get from 'lodash.get';
import { billRangeOptions, creditScoreOptions} from '@/constants/booking';

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
    isView,
    buttonText,
  } = props;
  const states = State.getStatesOfCountry('US');
  const cities = City.getCitiesOfState('US', values.state);
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useQuery(
    ['ALL_PRODUCTS', {}],
    GET_ALL_PRODUCTS, {
      ...reactQueryConfig,
    });
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  User information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <Field name="full_name">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Full Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Full Name"
                                type="text"
                                name="full_name"
                                disabled={isView || isLoadingSave}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.full_name}
                                invalid={fieldValidateBool(field, form)}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.full_name}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                    <Col lg="6">
                      <Field name="email">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Email
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="John@gmail.com"
                                type="text"
                                name="email"
                                disabled={isView || isLoadingSave}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                invalid={fieldValidateBool(field, form)}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.email}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <Field name="phone_number">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                              >
                                Phone Number
                              </label>
                              <PhoneInput
                                inputStyle={{
                                  width: '100%',
                                }}
                                inputClass="form-control-alternative
                                 admin-phone-input"
                                country={'us'}
                                value={values.phone_number}
                                onChange={value =>
                                  form.setFieldValue(field.name, value)
                                }
                                onBlur={handleBlur}
                                disabled={isView || isLoadingSave}
                                onlyCountries={['us']}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.phone_number}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4"/>
                <h6 className="heading-small text-muted mb-4">
                  Address Information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="12">
                      <Field name="address">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Your Address"
                                type="text"
                                name="address"
                                disabled={isView || isLoadingSave}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                invalid={fieldValidateBool(field, form)}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.address}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <Field name="state">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                State
                              </label>
                              <ReactSelect
                                isMulti={false}
                                isCreateable={false}
                                defaultValue={values.stateObj}
                                isDisabled={isView || isLoadingSave}
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
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.state}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                    <Col lg="6">
                      <Field name="city">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                City
                              </label>
                              <ReactSelect
                                isMulti={false}
                                isCreateable={false}
                                defaultValue={values.cityObj}
                                isDisabled={isView || isLoadingSave}
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
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.city}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>

                  </Row>
                </div>
                <hr className="my-4"/>
                <h6 className="heading-small text-muted mb-4">
                    Billing Information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <Field name="bill_range">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                            Monthly Utility Bill Range
                              </label>
                              <ReactSelect
                                isMulti={false}
                                isCreateable={false}
                                isDisabled={isView || isLoadingSave}
                                isLoading={isLoading || isFetching}
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
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.bill_range._id}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                    <Col lg="6">
                      <Field name="credit_score">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Credit Score
                              </label>
                              <ReactSelect
                                isMulti={false}
                                isCreateable={false}
                                isDisabled={isView || isLoadingSave}
                                isLoading={isLoading || isFetching}
                                defaultValue={values.credit_score}
                                options={creditScoreOptions}
                                getOptionLabel="name"
                                getOptionValue="id"
                                isSearchable={false}
                                placeholder="Select Credit Score"
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
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.credit_score._id}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                  </Row>
                </div>
                <div className="pl-lg-4">

                  <Row>
                    <Col lg="6">
                      <Field name="product_id">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Product
                                Monthly Utility Bill Range
                              </label>
                              <ReactSelect
                                isMulti={false}
                                isCreateable={false}
                                isDisabled={isView || isLoadingSave}
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
                                  );}
                                }
                                noOptionsMessage={() => (
                                  <div className="no-results">
                                      No Products found
                                      No Bill Range found
                                  </div>
                                )}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.product_id._id}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );}}
                      </Field>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4"/>
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export {BookingForm};