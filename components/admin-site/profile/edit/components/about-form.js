import React, {useState} from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  FormFeedback,
  Spinner,
  Badge,
} from "reactstrap";
import {Field} from 'formik';
import {fieldValidateBool} from "@/components/utils/form";
import ReactQuill from "@/components/react-quill";
import LazyLoadImages from "@/components/images";
import _get from "lodash.get";
import SvgIcons from "@/components/icons";
import UppyFileUploader from "@/components/uppy-file-uploader";
import {imageTypes} from "@/constants/file-types";
import {useMutation} from "react-query";
import {UPDATE_STORAGE_FILE} from "@/adminSite/blog/queries";
import {ProcessingModal} from "@/components/modal";

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

const AboutForm = (props: Props) => {
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
  const handleUploadDone = async data => {
    if (_get(values, 'image_id._id', '')) {
      await handleRemoveImage(_get(values, 'image_id._id', ''));
    }
    setFieldValue('image_id', data, true);
  };
  const handleRemoveImage = async id => {
    await updateFile(id);
  };
  return (
    <Form>
      <h6 className="heading-small text-muted mb-4 mt-4">
        Profile Info
      </h6>
      <div className="pl-lg-4">
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
        <Row className="mt-4">
          <Col lg="12">
            <Field name="heading">
              {({field, form}) => {
                return (
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Heading
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-username"
                      placeholder=" "
                      type="text"
                      name="heading"
                      disabled={isView || isLoadingSave}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.heading}
                      invalid={fieldValidateBool(field, form)}
                    />
                    {fieldValidateBool(field, form) && (
                      <FormFeedback>
                        {errors.heading}
                      </FormFeedback>
                    )}
                  </FormGroup>
                );
              }}
            </Field>
          </Col>
        </Row>
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
                      placeholder="Description of About"
                      disabled={isView || isLoadingSave}
                    />
                    {fieldValidateBool(field, form) && (
                      <FormFeedback>
                        {errors.description}
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

export { AboutForm };