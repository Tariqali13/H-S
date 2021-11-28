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
import {videoTypes} from "@/constants/file-types";
import {ProcessingModal} from "@/components/modal";
import ReactQuill from "@/components/react-quill";
import ReactPlayer from "react-player/lazy";

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
const VideoForm = (props: Props) => {
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
  const [videoUploadModal, setVideoModalOpen] = useState(false);
  const toggleVideoModal = () => setVideoModalOpen(!videoUploadModal);
  const handleUploadDone = data => {
    setFieldValue('video_id', data, true);
  };
  const handleRemoveVideo = async id => {
    await updateFile(id, {
      onSuccess: () => {
        setFieldValue('video_id', {}, true);
      },
      onError: () => {
        const otherOptions = {
          message: "Error in removing file",
        };
        Message.error(null, otherOptions);
      },
    });
  };
  const handleUploadVideo = () => {
    setVideoModalOpen(true);
  };

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
                  <hr className="my-4 mt-3"/>
                  <div className="pl-lg-4">
                    <h6 className="heading-small text-muted mb-4">
                      Video
                    </h6>
                    {!isView &&
                    !_get(values, 'video_id.file_url', '') && (
                      <Row>
                        <Col>
                          <Button
                            block
                            color="primary"
                            className="btn-icon btn-3 my-4"
                            size="lg"
                            onClick={handleUploadVideo}
                          >
                            <span className="btn-inner--text">
                          Upload Videos
                            </span>
                            <span className="btn-inner--icon">
                              <i className="ni ni-camera-compact"/>
                            </span>
                          </Button>
                          {_get(errors, 'video_id', '') && (
                            <FormFeedback>
                              {errors.video_id._id}
                            </FormFeedback>
                          )}
                        </Col>
                      </Row>
                    )}
                    <Row>
                      {_get(values,
                        'video_id.file_url',
                        '') && (
                        <Col lg="4">
                          {!isView && (
                            <Badge
                              bg="danger"
                              className="badge-circle bg-danger
                            text-white Video-badge badge-floating border-white"
                              onClick={() => handleRemoveVideo(_get(values,
                                'video_id._id',
                                ''))
                              }
                            >
                              <i className="ni ni-fat-remove"/>
                            </Badge>
                          )}
                          <div className="img-fluid rounded shadow" style={{ width: "100%", height: "100%"}}>
                            <ReactPlayer controls={true} url={_get(values,
                              'video_id.file_url',
                              '')}/>
                          </div>
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
        maxNumberOfFiles={1}
        acceptFileTypes={videoTypes}
        open={videoUploadModal}
        isMulti={false}
        axiosMethod="post"
        handleClose={toggleVideoModal}
        uploadUrl={"storage-file"}
        setOpenImageModal={setVideoModalOpen}
        performFunc={handleUploadDone}
      />
      {(isLoadingUpdateFile) && <ProcessingModal />}
    </Container>
  );
};

export {VideoForm};