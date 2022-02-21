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
  FormFeedback, Spinner, Badge,
} from "reactstrap";
import {Field} from 'formik';
import {fieldValidateBool} from "@/components/utils/form";
import {useMutation} from "react-query";
import _get from 'lodash.get';
import {UPDATE_STORAGE_FILE} from "@/adminSite/testimonial/queries";
import {Message} from "@/components/alert/message";
import UppyFileUploader from "@/components/uppy-file-uploader";
import {imageTypes} from "@/constants/file-types";
import {ProcessingModal} from "@/components/modal";
import ReactQuill from "@/components/react-quill";
import LazyLoadImages from "@/components/images";
// import ReactSelect from "@/components/react-select";
// import {GET_ALL_VIDEOS} from "@/adminSite/videos/queries";
// import reactQueryConfig from "@/constants/react-query-config";

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
const FolderForm = (props: Props) => {
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
  const handleUploadImage = () => {
    setImageModalOpen(true);
  };
  // const {
  //   data: videoData,
  //   isLoading: isLoadingVideos,
  // } = useQuery(['ALL_VIDEOS', { type: 'video' }], GET_ALL_VIDEOS, {
  //   ...reactQueryConfig,
  // });
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                                    Folder information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col>
                      <Field name="title">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                                                Title
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="All"
                                type="text"
                                name="title"
                                disabled={isView || isLoadingSave}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                                invalid={fieldValidateBool(field, form)}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback>
                                  {errors.title}
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
                    <Col>
                      <Field name="description">
                        {({field, form}) => {
                          return (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                                                Description
                              </label>
                              <ReactQuill
                                className="form-control-alternative"
                                handleBlur={() => handleBlur(
                                  { target: { name: "description" }},
                                )}
                                value={values.description}
                                handleChange={value =>
                                  form.setFieldValue(field.name, value, true)
                                }
                                placeholder="description for folder"
                                disabled={isView || isLoadingSave}
                              />
                              {fieldValidateBool(field, form) && (
                                <FormFeedback
                                  style={{
                                    marginTop: '3.50rem',
                                  }}
                                >
                                  {errors.description}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          );
                        }}
                      </Field>
                    </Col>
                  </Row>
                  {/*<hr className="my-4 mt-3"/>*/}
                  {/*<h6 className="heading-small text-muted mb-4">*/}
                  {/*  Restriction*/}
                  {/*</h6>*/}
                  {/*<div className="pl-lg-4">*/}
                  {/*  <Row>*/}
                  {/*    <Col>*/}
                  {/*      <Field name="is_blocked">*/}
                  {/*        {({field, form}) => {*/}
                  {/*          return (*/}
                  {/*            <FormGroup>*/}
                  {/*              <label*/}
                  {/*                className="form-control-label mr-4"*/}
                  {/*                htmlFor="input-username"*/}
                  {/*              >*/}
                  {/*                  Is Blocked*/}
                  {/*              </label>*/}
                  {/*              <Input*/}
                  {/*                className="form-control-alternative"*/}
                  {/*                id="input-username"*/}
                  {/*                type="checkbox"*/}
                  {/*                name="is_blocked"*/}
                  {/*                disabled={isView || isLoadingSave}*/}
                  {/*                onChange={handleChange}*/}
                  {/*                onBlur={handleBlur}*/}
                  {/*                checked={values.is_blocked}*/}
                  {/*                invalid={fieldValidateBool(field, form)}*/}
                  {/*              />*/}
                  {/*              {fieldValidateBool(field, form) && (*/}
                  {/*                <FormFeedback>*/}
                  {/*                  {errors.is_blocked}*/}
                  {/*                </FormFeedback>*/}
                  {/*              )}*/}
                  {/*            </FormGroup>*/}
                  {/*          );*/}
                  {/*        }}*/}
                  {/*      </Field>*/}
                  {/*    </Col>*/}
                  {/*    {_get(values, 'is_blocked') && (*/}
                  {/*      <Col>*/}
                  {/*        <Field name="unblock_after">*/}
                  {/*          {({field, form}) => {*/}
                  {/*            return (*/}
                  {/*              <FormGroup>*/}
                  {/*                <label*/}
                  {/*                  className="form-control-label mr-4"*/}
                  {/*                  htmlFor="input-username"*/}
                  {/*                >*/}
                  {/*                      Unblock After*/}
                  {/*                </label>*/}
                  {/*                <ReactSelect*/}
                  {/*                  isMulti={false}*/}
                  {/*                  isCreateable={false}*/}
                  {/*                  defaultValue={values.stateObj}*/}
                  {/*                  isDisabled={isView || isLoadingSave}*/}
                  {/*                  options={_get(videoData, 'data', [])}*/}
                  {/*                  getOptionLabel="title"*/}
                  {/*                  getOptionValue="_id"*/}
                  {/*                  isSearchable={false}*/}
                  {/*                  placeholder="Select Unblock After"*/}
                  {/*                  handleChange={value => {*/}
                  {/*                    form.setFieldValue(*/}
                  {/*                      field.name, value, true,*/}
                  {/*                    );*/}
                  {/*                  }}*/}
                  {/*                  handleBlur={handleBlur}*/}
                  {/*                  isLoading={isLoadingVideos}*/}
                  {/*                  classes="react-msd"*/}
                  {/*                  noOptionsMessage={() => (*/}
                  {/*                    <div className="no-results">*/}
                  {/*                              No Videos found*/}
                  {/*                    </div>*/}
                  {/*                  )}*/}
                  {/*                />*/}
                  {/*                {fieldValidateBool(field, form) && (*/}
                  {/*                  <FormFeedback>*/}
                  {/*                    {errors.unblock_after._id}*/}
                  {/*                  </FormFeedback>*/}
                  {/*                )}*/}
                  {/*              </FormGroup>*/}
                  {/*            );*/}
                  {/*          }}*/}
                  {/*        </Field>*/}
                  {/*      </Col>*/}
                  {/*    )}*/}
                  {/*  </Row>*/}
                  {/*</div>*/}
                  <hr className="my-4 mt-3"/>
                  <div className="pl-lg-4">
                    <h6 className="heading-small text-muted mb-4">
                                            Folder Image
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
                            onClick={handleUploadImage}
                          >
                            <span className="btn-inner--text">
                          Upload Folder Image
                            </span>
                            <span className="btn-inner--icon">
                              <i className="ni ni-camera-compact"/>
                            </span>
                          </Button>
                          {_get(errors, 'image_id', '') && (
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
                  </div>
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
      <UppyFileUploader
        maxFileSize={100}
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

export {FolderForm};