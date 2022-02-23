import React, {useContext, useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {DELETE_VIDEO, GET_ALL_VIDEOS, GET_EMPLOYEE_PROGRESS_BY_ID, GET_VIDEO_BY_ID, REPOSITION_DATA} from "@/adminSite/videos/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import Router from "next/router";
import _get from "lodash.get";
import {Message} from "@/components/alert/message";
import {Stats} from "@/adminSite/common";
import { TablePagination} from "@/components/table";
import {ConfirmationModal, ProcessingModal} from "@/components/modal";
import TemplateContext from "@/layouts/secure-template/context";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  Col,
  Container, FormFeedback,
  FormGroup,
  Row,
  Spinner,
  Input,
} from "reactstrap";
import ReactHtmlParser from "react-html-parser";
import {Field, Formik} from "formik";
import {validateUpdateOrder, validateUpdateOtherFolderOrder} from "@/adminSite/videos/validation";
import ReactSelect from "@/components/react-select";
import {fieldValidateBool} from "@/utils/form";

const Videos = () => {
  const router = useRouter();
  const { folderId } = router.query;
  const [deleteModal, setDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [orderModal, setOrderModal] = useState(false);
  const [videoToOrder, setVideoToOrder] = useState({});

  const [otherFolderReOrder, setOtherFolderReOrder] = useState(false);
  const [otherFolder, setOtherFolder] = useState({});
  const toggleOrderModal = () => {
    setOrderModal(!orderModal);
    setOtherFolderReOrder(false);
    setOtherFolder({});
  };
  const {
    userData,
  } = useContext(TemplateContext);
  const enabled = typeof folderId === 'string';
  const {
    mutate: deleteVideo,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_VIDEO);
  const { mutate: repositionData, isLoading: isLoadingOrder} = useMutation(REPOSITION_DATA);
  const [videoQueryParams, setVideoQueryParams] = useState({
    page_no: 1,
    records_per_page: 100,
    folder_id: folderId,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: videoData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_VIDEOS', {...videoQueryParams, folder_id: folderId }], GET_ALL_VIDEOS, {
    ...reactQueryConfig,
    enabled: enabled,
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
  const { data: folderData} = useQuery(['VIDEO_BY_ID', { videoId: folderId }], GET_VIDEO_BY_ID, {
    ...reactQueryConfig,
    enabled: enabled,
  });
  const enabledProgressQuery = _get(userData, 'is_admin', false) === false &&
      _get(userData, '_id', '') !== '';
  const {
    data: employeeProgressData,
  } = useQuery(['EMPLOYEE_PROGRESS_BY_ID', { employeeId: _get(userData, '_id', '') }],
    GET_EMPLOYEE_PROGRESS_BY_ID, {
      ...reactQueryConfig,
      enabled: enabledProgressQuery,
    });
  const handleCreate = () => {
    Router.push(
      `/admin/h-s-academy/${folderId}/create`,
      `/admin/h-s-academy/${folderId}/create`,
      { shallow: true },
    );
  };

  const handleCreateFolder = () => {
    Router.push(
      `/admin/h-s-academy/${folderId}/folder-create`,
      `/admin/h-s-academy/${folderId}/folder-create`,
      { shallow: true },
    );
  };

  const handleNext = currentPage => {
    setVideoQueryParams({
      ...videoQueryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = currentPage => {
    setVideoQueryParams({
      ...videoQueryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = page => {
    setVideoQueryParams({
      ...videoQueryParams,
      page_no: page,
    });
  };

  const handleView = (e, id, type) => {
    e.stopPropagation();
    if (type === 'video') {
      if (_get(userData, 'is_admin', false)) {
        Router.push(
          `/admin/h-s-academy/${folderId}/${id}`,
          `/admin/h-s-academy/${folderId}/${id}`,
          { shallow: true },
        );
      } else {
        Router.push(
          `/admin/h-s-academy/${folderId}/${id}/view`,
          `/admin/h-s-academy/${folderId}/${id}/view`,
          { shallow: true },
        );
      }
    }
    if (type === 'folder') {
      Router.push(
        `/admin/h-s-academy/${id}`,
        `/admin/h-s-academy/${id}`,
        { shallow: true },
      );
    }
  };

  const handleEdit = (e, id, type) => {
    e.stopPropagation();
    if (type === 'video') {
      Router.push(
        `/admin/h-s-academy/${folderId}/${id}/edit`,
        `/admin/h-s-academy/${folderId}/${id}/edit`,
        {shallow: true},
      );
    }
    if (type === 'folder') {
      Router.push(
        `/admin/h-s-academy/${id}/edit`,
        `/admin/h-s-academy/${id}/edit`,
        { shallow: true },
      );
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setDeleteModal(true);
    const findVideo = _get(videoData, 'data', []).find(
      video => video._id === id);
    setVideoToDelete(findVideo);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteVideo(_get(videoToDelete, '_id', ''), {
      onSuccess: async res => {
        await refetch();
        Message.success(res);
      },
      onError: err => {
        Message.error(err);
      },
    });
  };

  const handleRouteBack = () => {
    Router.back();
  };
  const handleReOrder = (e, id) => {
    e.stopPropagation();
    setOrderModal(true);
    const findVideo = _get(videoData, 'data', []).find(
      video => video._id === id);
    setVideoToOrder(findVideo);
  };
  const {
    data: allFoldersData,
    isLoading: isLoadingFoldersData,
  } = useQuery(['ALL_VIDEOS', { type: 'folder' }], GET_ALL_VIDEOS, {
    ...reactQueryConfig,
    enabled: otherFolderReOrder,
  });
  const enabledOtherFoldersOrder = _get(otherFolder, '_id') && otherFolderReOrder;
  const {
    data: otherFolderData,
    isLoading: isLoadingOtherFolderData,
  } = useQuery(['ALL_VIDEOS', { folder_id: _get(otherFolder, '_id') }], GET_ALL_VIDEOS, {
    ...reactQueryConfig,
    enabled: enabledOtherFoldersOrder,
  });
  const foldersDataToFind = _get(otherFolderData, 'data', []).filter(f => f._id !== folderId);
  const generateLocations = Array.from({length: _get(videoData, 'total_number_of_videos', 0)}, (_, i) => {
    return {
      id: i + 1,
      value: `${i + 1}`,
    };
  });
  const getOtherFolderOrdersBy = _get(otherFolderData, 'data', []).map((f, i) => {
    return {
      id: i + 1,
      value: `${f.order_by}`,
    };
  });
  const locationToMap = generateLocations.filter(loc => loc.value != videoToOrder?.order_by);
  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [router.pathname, folderId]);
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
                  Add Video
                  </Button>
                )}
                {_get(userData, 'is_admin', false) && (
                  <Button
                    className="float-right"
                    color="primary"
                    onClick={handleCreateFolder}
                  >
                      Add Folder
                  </Button>
                )}
                <h3 className="mb-0">
                  <button className="btn btn-primary" onClick={handleRouteBack}>
                    Back
                  </button> {_get(folderData, 'data.title', 'Videos')} - All Videos / Folders</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  {!isLoading && !isFetching && _get(videoData, 'data', []).map((video, i) => (
                    <Col md={4} key={i} className={`d-flex my-1 ${!_get(userData, 'is_admin', false) && _get(video, 'is_blocked', false) && 'disabled-course'}`}>
                      <Card className="shadow cursor-pointer" onClick={e => handleView(e, _get(video, '_id', ''), _get(video, 'type', ''))}>
                        {/*{!_get(userData, 'is_admin', false) && _get(video, 'is_blocked', false) && (*/}
                        {/*  <div className="lock-wrap">*/}
                        {/*    <i className="fa fa-lock"/>*/}
                        {/*  </div>*/}
                        {/*)}*/}
                        <div className="w-100 text-center">
                          {_get(userData, 'is_admin', false) && (
                            <span className="card-menu btn mt-1" onClick={e => handleDelete(e, _get(video, '_id', ''), _get(video, 'type', ''))}> <i className="fa fa-trash" /></span>)}
                          {_get(userData, 'is_admin', false) && (
                            <span className="card-menu btn mt-1" style={{ marginRight: '54px' }} onClick={e => handleEdit(e, _get(video, '_id', ''), _get(video, 'type', ''))}> <i className="fa fa-edit" /></span>)}
                          {_get(userData, 'is_admin', false) && _get(videoData, 'total_number_of_videos', 0) > 1 && (
                            <span className="card-menu btn mt-1" style={{ marginRight: '100px' }} onClick={e => handleReOrder(e, _get(video, '_id', ''))}> <i className="fa fa-arrow-right"/></span>)}
                          {_get(video, 'type', '') === 'video' && <CardImg className="w-100 card-images" top width="100%" src={_get(video, 'image_id.file_url', '/img/video-svg.png')} alt="Card image cap" />}
                          {_get(video, 'type', '') === 'folder' && <CardImg className="w-100  card-images" top width="100%" src={_get(video, 'image_id.file_url', '/img/folder-icon.jpg')} alt="Card image cap" />}
                        </div>
                        <CardHeader className="border-0">
                          <h3 className="mb-0">Title: {video.title}</h3>
                          <h3 className="mb-0">Type: {_get(video, 'type', '').toUpperCase()}</h3>
                          {_get(video, 'type', '') === 'folder' && <h3 className="mb-0">Total Videos: {_get(video, 'total_videos', 0)}</h3>}
                          {_get(video, 'type', '') === 'folder' && <h3 className="mb-0">Total Folders: {_get(video, 'total_folders', 0)}</h3>}
                          <br />
                          {!_get(userData, 'is_admin', false) && _get(video, 'type', '') === 'video' && (
                            <span>Is Watched: {_get(employeeProgressData, 'data.video_ids', []).includes(
                              _get(video, 'video_id._id')) ?
                              <i className="ni ni-check-bold" /> : 'Not Yet!'
                            }</span>
                          )}
                        </CardHeader>
                        <CardBody className="pt-0">
                          <h3 className="mb-0">Description: </h3>
                          <p>{ReactHtmlParser(_get(video, 'description', ''))}</p>
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
                {(_get(videoData, 'data', []).length === 0 || isError) && (
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
          Are you sure you want to delete {videoToDelete?.type === 'video' ? 'Video' : 'Folder'}
          <strong> {videoToDelete?.title}</strong>
        </p>
      </ConfirmationModal>
      <Formik
        enableReinitialize={true}
        initialValues={{
          desired_location: '',
          other_folder: otherFolderReOrder,
          other_folder_id: {},
        }}
        validationSchema={otherFolderReOrder ? validateUpdateOtherFolderOrder: validateUpdateOrder}
        onSubmit={async (values, actions) => {
          const dataToSend = {
            desired_location: values.desired_location.value,
            videoId: videoToOrder?._id,
          };
          if (folderId) {
            dataToSend.folder_id = folderId;
          }
          if (otherFolderReOrder) {
            dataToSend.other_folder = otherFolderReOrder;
            dataToSend.other_folder_id = _get(values, 'other_folder_id._id', '');
            dataToSend.folder_id = _get(values, 'other_folder_id._id', '');
          }
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
              setOtherFolderReOrder(false);
              setOtherFolder({});
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
              <Field name="other_folder">
                {({field, form}) => {
                  return (
                    <FormGroup>
                      <label
                        className="form-control-label mr-4"
                        htmlFor="input-username"
                      >
                        Other Folder
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-username"
                        type="checkbox"
                        name="other_folder"
                        disabled={formikProps.isSubmitting}
                        onChange={e => {
                          setOtherFolderReOrder(!otherFolderReOrder);
                          formikProps.handleChange(e);
                        }}
                        onBlur={formikProps.handleBlur}
                        checked={formikProps.values.other_folder}
                        invalid={fieldValidateBool(field, form)}
                      />
                      {fieldValidateBool(field, form) && (
                        <FormFeedback>
                          {formikProps.errors.other_folder}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  );
                }}
              </Field>
              {formikProps.values.other_folder && (
                <Field name="other_folder_id">
                  {({field, form}) => {
                    return (
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                              Select Folder
                        </label>
                        <ReactSelect
                          isMulti={false}
                          isCreateable={false}
                          defaultValue={formikProps.values.other_folder_id}
                          isDisabled={formikProps.isSubmitting || isLoadingFoldersData}
                          options={foldersDataToFind}
                          getOptionLabel="title"
                          getOptionValue="_id"
                          isLoading={isLoadingFoldersData}
                          isSearchable={false}
                          placeholder="Select Folder"
                          handleChange={value => {
                            form.setFieldValue(
                              field.name, value, true,
                            );
                            form.setFieldValue(
                              'desired_location', '', true,
                            );
                            setOtherFolder(value);
                          }}
                          handleBlur={formikProps.handleBlur}
                          // isLoading={isUserDataLoading}
                          classes="react-msd"
                        />
                        {fieldValidateBool(field, form) && (
                          <FormFeedback>
                            {formikProps.errors.other_folder_id._id}
                          </FormFeedback>
                        )}
                      </FormGroup>
                    );
                  }}
                </Field>
              )}
              {formikProps.values.other_folder && _get(otherFolder, '_id') && (
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
                          isDisabled={formikProps.isSubmitting || isLoadingOtherFolderData}
                          options={getOtherFolderOrdersBy}
                          isLoading={isLoadingOtherFolderData}
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
              )}
              {!formikProps.values.other_folder && (
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
              )}
            </ConfirmationModal>
          );}}
      </Formik>
      {(isLoadingDelete || isLoadingOrder) && <ProcessingModal />}
    </>
  );
};

export default Videos;