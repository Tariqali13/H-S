import React, {useState} from 'react';
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
  FormFeedback,
  Spinner,
  Badge, InputGroup,
} from "reactstrap";
import {Field} from 'formik';
import {fieldValidateBool} from "@/components/utils/form";
import ReactQuill from '@/components/react-quill';
import UppyFileUploader from "@/components/uppy-file-uploader";
import {imageTypes} from "@/constants/file-types";
import _get from 'lodash.get';
import {ProcessingModal} from "@/components/modal";
import LazyLoadImages from "@/components/images";
import { UPDATE_STORAGE_FILE} from '../queries';
import { useMutation } from "react-query";
import {Message} from "@/components/alert/message";

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
};

const EmployeeForm = (props: Props) => {
  const
    {
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
    } = props;
  const {
    mutate: updateFile,
    isLoading: isLoadingUpdateFile,
  } = useMutation(UPDATE_STORAGE_FILE);
  const [imageUploadModal, setImageModalOpen] = useState(false);
  const toggleImageModal = () => setImageModalOpen(!imageUploadModal);
  const handleUploadDone = data => {
    setFieldValue('image_id', data, true);
  };
  const handleRemoveImage = async id => {
    await updateFile(id, {
      onSuccess: () => {
        setFieldValue('image_id', {}, true);
      },
      onError: () => {
        const otherOptions = {
          message: "Error in removing file",
        };
        Message.error(null, otherOptions);
      },
    });
  };
  const handleUploadImages = () => {
    setImageModalOpen(true);
  };
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  Employee information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col>
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
                                    placeholder="First Name"
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
                    <Col>
                      <Field name="last_name">
                        {({field, form}) => {
                          return (
                              <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                  Last Name
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-username"
                                    placeholder="Last Name"
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
                                    placeholder="Email"
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
                    <Col lg="6">
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
                                    placeholder="******"
                                    type="password"
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
                  </Row>
                  <Row>
                    <Col lg="6">
                      <Field name="confirm_password">
                        {({field, form}) => {
                          return (
                              <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                 Confirm Password
                                </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-username"
                                    placeholder="******"
                                    type="password"
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
                <hr className="my-4 mt-5"/>
                <div className= "pl-lg-4">
                  <h6 className="heading-small text-muted mb-4">
                    Image Id
                  </h6>
                  {!isView &&
                  !_get(values, 'image_id.file_url', '') && (
                      <Row>
                        <Col>
                          <Button
                              block
                              color="primary"
                              className="btn-icon btn-3 my-4"
                              size="lg"
                              onClick={handleUploadImages}
                          >
                          <span className="btn-inner--text">
                          Upload Images
                          </span>
                            <span className="btn-inner--icon">
                            <i className="ni ni-camera-compact"/>
                          </span>
                          </Button>
                          {_get(errors, 'image_id._id', '') && (
                              <FormFeedback>
                                {errors.image_id._id}
                              </FormFeedback>
                          )}
                        </Col>
                      </Row>
                  )}
                  <Row>
                    {_get(values,
                        'image_id.file_url',
                        '') && (
                        <Col lg="4">
                          {!isView && (
                              <Badge
                                  bg="danger"
                                  className="badge-circle bg-danger
                            text-white image-badge badge-floating border-white"
                                  onClick={() => handleRemoveImage(_get(values,
                                      'image_id._id',
                                      ''))
                                  }
                              >
                                <i className="ni ni-fat-remove"/>
                              </Badge>
                          )}
                          <FormGroup>
                            <LazyLoadImages
                                isHeight={true}
                                isWidth={true}
                                height={200}
                                width={200}
                                url={_get(values,
                                    'image_id.file_url',
                                    '')
                                }
                                className="img-fluid rounded shadow"
                            />
                          </FormGroup>
                        </Col>
                    )}
                  </Row>
                  <hr className="my-4 mt-3"/>
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
            </CardBody>
          </Card>
        </Col>
      </Row>
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
    </Container>
  );
};

export {EmployeeForm};