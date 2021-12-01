import React, {useState} from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  FormFeedback,
  Spinner, Badge,
} from "reactstrap";
import {Field} from 'formik';
import {fieldValidateBool} from "@/components/utils/form";
import {useMutation} from "react-query";
import {UPDATE_STORAGE_FILE} from "@/components/uppy-file-uploader/queries";
import _get from "lodash.get";
import LazyLoadImages from "@/components/images";
import SvgIcons from "@/components/icons";
import UppyFileUploader from "@/components/uppy-file-uploader";
import {imageTypes} from "@/constants/file-types";
import {ProcessingModal} from "@/components/modal";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import ReactSelect from "@/components/react-select";
import {positionOptions} from "@/constants/employee";
import {City, State} from "country-state-city";

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
  setFieldValue: any,
  is_admin: boolean,
};

const ProfileForm = (props: Props) => {
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
    setFieldValue,
    is_admin,
  } = props;
  const {
    mutate: updateFile,
    isLoading: isLoadingUpdateFile,
  } = useMutation(UPDATE_STORAGE_FILE);
  const [imageUploadModal, setImageModalOpen] = useState(false);
  const toggleImageModal = () => setImageModalOpen(!imageUploadModal);
  const handleUploadDone = async data => {
    if (_get(values, 'image_id._id', '')) {
      await handleRemoveImage(_get(values, 'image_id._id', ''));
    }
    setFieldValue('image_id', data, true);
  };
  const handleRemoveImage = async id => {
    await updateFile(id);
  };
  const states = State.getStatesOfCountry('US');
  const cities = City.getCitiesOfState('US', values.state);
  return (
    <Form>
      <h6 className="heading-small text-muted mb-4 mt-4">
        Profile Info
      </h6>
      <div className="pl-lg-4 mb-5">
        <Row>
          <Col lg="2" className="order-lg-2">
            {!isView && (
              <Badge
                bg="info"
                className="badge-circle bg-primary
                 text-white image-badge badge-floating border-white"
                onClick={() => setImageModalOpen(true)}
              >
                <i className="ni ni-camera-compact"/>
              </Badge>
            )}
            {_get(values, 'image_id.file_url', '') ? (
              <div className="avatar-image">
                <LazyLoadImages
                  isHeight={true}
                  isWidth={true}
                  height={200}
                  width={200}
                  url={_get(values, 'image_id.file_url', '')}
                  className="rounded-circle"
                />
              </div>
            ) : <SvgIcons type="svg-avatar" />}
          </Col>
        </Row>
      </div>
      <div className="pl-lg-4">
        <Row>
          <Col lg="6">
            <Field name="first_name">
              {({field, form}) => {
                return (
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      First Name
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder=" "
                      type="text"
                      name="first_name"
                      disabled={isView || isLoadingSave}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.first_name}
                      invalid={fieldValidateBool(field, form)}
                    />
                    {fieldValidateBool(field, form) && (
                      <FormFeedback>
                        {errors.first_name}
                      </FormFeedback>
                    )}
                  </FormGroup>
                );
              }}
            </Field>
          </Col>
          <Col lg="6">
            <Field name="last_name">
              {({field, form}) => {
                return (
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Last Name
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder=" "
                      type="text"
                      name="last_name"
                      disabled={isView || isLoadingSave}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.last_name}
                      invalid={fieldValidateBool(field, form)}
                    />

                    {fieldValidateBool(field, form) && (
                      <FormFeedback>
                        {errors.last_name}
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
                      placeholder=" "
                      type="text"
                      name="email"
                      disabled={isView || isLoadingSave || !is_admin}
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
      <UppyFileUploader
        maxFileSize={30}
        maxNumberOfFiles={1}
        acceptFileTypes={imageTypes}
        open={imageUploadModal}
        isMulti={false}
        axiosMethod="post"
        handleClose={toggleImageModal}
        uploadUrl={"storage-file"}
        setOpenImageModal={setImageModalOpen}
        performFunc={handleUploadDone}
      />
      {(isLoadingUpdateFile) && <ProcessingModal />}
    </Form>
  );
};

export { ProfileForm };