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
// import reactQueryConfig from "@/constants/react-query-config";
import _get from 'lodash.get';
import {UPDATE_STORAGE_FILE} from "@/adminSite/testimonial/queries";
import {Message} from "@/components/alert/message";
import UppyFileUploader from "@/components/uppy-file-uploader";
import {imageTypes, videoTypes} from "@/constants/file-types";
import {ProcessingModal} from "@/components/modal";
// import {GET_ALL_VIDEOS, GET_VIDEO_COUNT} from '../queries';
import ReactQuill from "@/components/react-quill";
import ReactPlayer from 'react-player/lazy';
import LazyLoadImages from "@/components/images";
// import Pagination from "@/utils/pagination";
// import ReactSelect from "@/components/react-select";

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

const VideoFormMulti = (props: Props) => {
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
  const [isMultiFilesUploading, setIsLoadingMultiFiles] = useState(false);
  const [videoUploadModal, setVideoModalOpen] = useState(false);
  const toggleVideoModal = () => setVideoModalOpen(!videoUploadModal);
  const handleUploadDone = res => {
    const newData = [...values.videos_data, ..._get(res, 'data', [])];
    setFieldValue('videos_data', newData, true);
  };
  const handleRemoveVideo = async id => {
    await updateFile(id, {
      onSuccess: () => {
        const filterData = values.videos_data.filter(pic => pic._id !== id);
        setFieldValue('videos_data', filterData, true);
      },
      onError: () => {
        const otherOptions = {
          message: "Error in removing file",
        };
        Message.error(null, otherOptions);
      },
    });
  };
  const handleUploadVideos = () => {
    setVideoModalOpen(true);
  };
  const [imageUploadModal, setImageModalOpen] = useState(false);
  const toggleImageModal = () => setImageModalOpen(!imageUploadModal);
  const handleUploadDoneImage = data => {
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
                  Video information
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
                                placeholder="description for video"
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
                  {/*                  Unblock After*/}
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
                  {/*                          No Videos found*/}
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
                  <h6 className="heading-small text-muted mb-4">
                    Videos
                  </h6>
                  <div className="pl-lg-4">
                    {!isView && (
                      <Row>
                        <Col>
                          <Button
                            block
                            color="primary"
                            className="btn-icon btn-3 my-4"
                            size="lg"
                            onClick={handleUploadVideos}
                          >
                            <span className="btn-inner--text">
                          Upload Videos
                            </span>
                            <span className="btn-inner--icon">
                              <i className="ni ni-camera-compact"/>
                            </span>
                          </Button>
                          {_get(errors, 'videos_data', '') && (
                            <FormFeedback>
                              {errors.videos_data._id}
                            </FormFeedback>
                          )}
                        </Col>
                      </Row>
                    )}
                    <Row>
                      {_get(values, 'videos_data', []).map((video, i) => (
                        <Col lg="4" key={i}>
                          {!isView && (
                            <Badge
                              bg="danger"
                              className="badge-circle bg-danger
                            text-white image-badge badge-floating border-white"
                              onClick={() => handleRemoveVideo(video._id)}
                            >
                              <i className="ni ni-fat-remove"/>
                            </Badge>
                          )}
                          <div className="img-fluid rounded shadow" style={{ width: "600px", height: "300px"}}>
                            <ReactPlayer controls={true} url={_get(video, 'file_url', '')} width={"100%"} height={"100%"}  />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  <hr className="my-4 mt-3"/>
                  <div className="pl-lg-4">
                    <h6 className="heading-small text-muted mb-4">
                      Video Thumbnail Image
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
        maxFileSize={1000}
        maxNumberOfFiles={10}
        acceptFileTypes={videoTypes}
        open={videoUploadModal}
        isMulti={true}
        axiosMethod="post"
        handleClose={toggleVideoModal}
        uploadUrl={"storage-file/multiple-files"}
        setOpenImageModal={setVideoModalOpen}
        handleUploadDone={handleUploadDone}
        setIsLoadingMultiFiles={setIsLoadingMultiFiles}
      />
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
        performFunc={handleUploadDoneImage}
      />
      {(isLoadingUpdateFile || isMultiFilesUploading) && <ProcessingModal />}
    </Container>
  );
};

export { VideoFormMulti };