import React, {useContext, useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {DELETE_VIDEO, GET_ALL_VIDEOS, REPOSITION_DATA} from "@/adminSite/videos/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import Router from "next/router";
import _get from "lodash.get";
import {Message} from "@/components/alert/message";
import {Stats} from "@/adminSite/common";
import {ConfirmationModal, ProcessingModal} from "@/components/modal";
import TemplateContext from "@/layouts/secure-template/context";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  Col,
  CardImg,
  CardFooter,
  Spinner,
  FormFeedback,
  FormGroup,
} from "reactstrap";
import ReactHtmlParser from 'react-html-parser';
import {TablePagination} from "@/components/table";
import {validateUpdateOrder} from "@/adminSite/videos/validation";
import {Field, Formik} from "formik";
import ReactSelect from "@/components/react-select";
import {fieldValidateBool} from "@/utils/form";

const Folders = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [orderModal, setOrderModal] = useState(false);
  const [videoToOrder, setVideoToOrder] = useState({});
  const toggleOrderModal = () => setOrderModal(!orderModal);
  const {
    userData,
  } = useContext(TemplateContext);
  const {
    mutate: deleteFolder,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_VIDEO);
  const { mutate: repositionData, isLoading: isLoadingOrder} = useMutation(REPOSITION_DATA);
  const [folderQueryParams, setFolderQueryParams] = useState({
    page_no: 1,
    records_per_page: 100,
    type: 'folder',
    is_parent_folder: true,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: folderData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_VIDEOS', folderQueryParams], GET_ALL_VIDEOS, {
    ...reactQueryConfig,
    onSuccess: res => {
      const { result } = Pagination(
        res.records_per_page,
        res.total_number_of_videos,
        res.page_no,
        res.data.length,
      );
      return setPaginationData(result);
    },
    onError: () => {
      setPaginationData({});
    },
  });

  const handleCreate = () => {
    Router.push(
      '/admin/h-s-academy/create',
      '/admin/h-s-academy/create',
      { shallow: true },
    );
  };

  const handleNext = currentPage => {
    setFolderQueryParams({
      ...folderQueryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = currentPage => {
    setFolderQueryParams({
      ...folderQueryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = page => {
    setFolderQueryParams({
      ...folderQueryParams,
      page_no: page,
    });
  };

  const handleView = (e, id) => {
    e.stopPropagation();
    if (_get(userData, 'is_admin', false)) {
      Router.push(
        `/admin/h-s-academy/${id}`,
        `/admin/h-s-academy/${id}`,
        { shallow: true },
      );
    } else {
      Router.push(
        `/admin/h-s-academy/${id}`,
        `/admin/h-s-academy/${id}`,
        { shallow: true },
      );
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    Router.push(
      `/admin/h-s-academy/${id}/edit`,
      `/admin/h-s-academy/${id}/edit`,
      { shallow: true },
    );
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setDeleteModal(true);
    const findFolder = _get(folderData, 'data', []).find(
      folder => folder._id === id);
    setFolderToDelete(findFolder);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteFolder(_get(folderToDelete, '_id', ''), {
      onSuccess: async res => {
        await refetch();
        Message.success(res);
      },
      onError: err => {
        Message.error(err);
      },
    });
  };
  const handleReOrder = (e, id) => {
    e.stopPropagation();
    setOrderModal(true);
    const findVideo = _get(folderData, 'data', []).find(
      video => video._id === id);
    setVideoToOrder(findVideo);
  };

  const generateLocations = Array.from({length: _get(folderData, 'total_number_of_videos', 0)}, (_, i) => {
    return {
      id: i + 1,
      value: `${i + 1}`,
    };
  });
  const locationToMap = generateLocations.filter(loc => loc.value != videoToOrder?.order_by);
  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, []);
  return (
    <>
      <Stats />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                {_get(userData, 'is_admin', false) && (
                  <Button
                    className="float-right"
                    color="primary"
                    onClick={handleCreate}
                  >
                  Create Folder
                  </Button>
                )}
                <h3 className="mb-0">H&S Academy -  All Folders</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  {(!isLoading || !isFetching) && _get(folderData, 'data', []).map((folder, i) => (
                    <Col md={4} key={i} className="d-flex my-1">
                      <Card className="shadow cursor-pointer" onClick={e => handleView(e, _get(folder, '_id', ''))}>
                        <div className="w-100 text-center">
                          {_get(userData, 'is_admin', false) && (
                            <span className="card-menu btn mt-1" onClick={e => handleDelete(e, _get(folder, '_id', ''), _get(folder, 'type', ''))}> <i className="fa fa-trash" /></span>)}
                          {_get(userData, 'is_admin', false) && (
                            <span className="card-menu btn mt-1" style={{ marginRight: '54px' }} onClick={e => handleEdit(e, _get(folder, '_id', ''), _get(folder, 'type', ''))}> <i className="fa fa-edit" /></span>)}
                          {_get(userData, 'is_admin', false) && _get(folderData, 'total_number_of_videos', 0) > 1 && (
                            <span className="card-menu btn mt-1" style={{ marginRight: '100px' }} onClick={e => handleReOrder(e, _get(folder, '_id', ''))}> <i className="fa fa-arrow-right"/></span>)}
                          {_get(folder, 'type', '') === 'video' && <CardImg className="w-100 card-images" top width="100%" src={_get(folder, 'image_id.file_url', '/img/video-svg.png')} alt="Card image cap" />}
                          {_get(folder, 'type', '') === 'folder' && <CardImg className="w-100  card-images" top width="100%" src={_get(folder, 'image_id.file_url', '/img/folder-icon.jpg')} alt="Card image cap" />}
                        </div>
                        <CardHeader className="border-0">
                          <h3 className="mb-0">Title: {folder.title}</h3>
                          <h3 className="mb-0">Type: {folder.type}</h3>
                          <h3 className="mb-0">Total Videos: {_get(folder, 'total_videos', 0)}</h3>
                        </CardHeader>
                        <CardBody className="pt-0">
                          <h3 className="mb-0">Description: </h3>
                          <p>{ReactHtmlParser(_get(folder, 'description', ''))}</p>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
                {(isLoading || isFetching) && (
                  <div className="w-100 mb-3 mt-3 text-center">
                    <Spinner/>
                  </div>
                )}
                {(_get(folderData, 'data', []).length === 0 || isError) && (
                  <div className="w-100 mb-3 mt-3 text-center">
                      No Data Found
                  </div>
                )}
              </CardBody>
              {(!isLoading || !isFetching) &&
              _get(paginationData, 'totalNumberofRecord', 0) > 0 && (
                <CardFooter className="py-4">
                  <TablePagination
                    paginationData={paginationData}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    handlePageSelect={handlePageSelect}
                  />
                </CardFooter>
              )}
            </Card>
          </div>
        </Row>
      </Container>
      <ConfirmationModal
        heading="Confirm Delete"
        modalOpen={deleteModal}
        toggleModal={toggleDeleteModal}
        handleCancelButton={toggleDeleteModal}
        isCancelButton={true}
        isConfirmButton={true}
        confirmButtonText="Delete"
        handleConfirmButton={handleConfirmDelete}
      >
        <p>
          Are you sure you want to delete Folder
          <strong> {folderToDelete?.title}</strong>
        </p>
      </ConfirmationModal>
      <Formik
        enableReinitialize={true}
        initialValues={{
          desired_location: '',
        }}
        validationSchema={validateUpdateOrder}
        onSubmit={async (values, actions) => {
          const dataToSend = {
            desired_location: values.desired_location.value,
            videoId: videoToOrder?._id,
          };
          if (values.desired_location.value > videoToOrder?.order_by) {
            dataToSend.direction = 'right';
          }
          if (values.desired_location.value < videoToOrder?.order_by) {
            dataToSend.direction = 'left';
          }
          await repositionData(dataToSend, {
            onSuccess: res => {
              Message.success(res);
              refetch();
              setOrderModal(false);
              setVideoToOrder({});
              actions.resetForm();
            },
            onError: err => {
              Message.error(err);
              actions.resetForm();
            },
          });
        }}
      >
        {formikProps => {
          return (
            <ConfirmationModal
              heading={`Re-Order ${videoToOrder?.type === 'video' ? 'Video' : 'Folder'}`}
              modalOpen={orderModal}
              toggleModal={toggleOrderModal}
              handleCancelButton={toggleOrderModal}
              isCancelButton={true}
              isConfirmButton={true}
              disabledConfirmButton={!formikProps.dirty || formikProps.isSubmitting}
              confirmButtonText="Re-Order"
              handleConfirmButton={formikProps.handleSubmit}
            >
              <p>
                  Current Order Index of {videoToOrder?.type === 'video' ? 'Video' : 'Folder'} is {videoToOrder?.order_by}
              </p>
              <Field name="desired_location">
                {({field, form}) => {
                  return (
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-country"
                      >
                            Select Desired Location
                      </label>
                      <ReactSelect
                        isMulti={false}
                        isCreateable={false}
                        defaultValue={formikProps.values.desired_location}
                        isDisabled={formikProps.isSubmitting}
                        options={locationToMap}
                        getOptionLabel="id"
                        getOptionValue="value"
                        isSearchable={false}
                        placeholder="Select Desired Location"
                        handleChange={value => {
                          form.setFieldValue(
                            field.name, value, true,
                          );
                        }}
                        handleBlur={formikProps.handleBlur}
                        // isLoading={isUserDataLoading}
                        classes="react-msd"
                      />
                      {fieldValidateBool(field, form) && (
                        <FormFeedback>
                          {formikProps.errors.desired_location.value}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  );
                }}
              </Field>
            </ConfirmationModal>
          );}}
      </Formik>
      {(isLoadingDelete || isLoadingOrder) && <ProcessingModal />}
    </>
  );
};

export default Folders;