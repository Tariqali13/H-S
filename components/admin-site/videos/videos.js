import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {DELETE_VIDEO, GET_ALL_VIDEOS, GET_EMPLOYEE_PROGRESS_BY_ID} from "@/adminSite/videos/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import Router from "next/router";
import _get from "lodash.get";
import {Message} from "@/components/alert/message";
import {Stats} from "@/adminSite/common";
import { TablePagination} from "@/components/table";
import {ConfirmationModal, ProcessingModal} from "@/components/modal";
import { GET_FOLDER_BY_ID } from '@/adminSite/folders/queries';
import TemplateContext from "@/layouts/secure-template/context";
import { useRouter } from "next/router";
import {Button, Card, CardBody, CardFooter, CardHeader, CardImg, Col, Container, Row, Spinner} from "reactstrap";
import ReactHtmlParser from "react-html-parser";

const Videos = () => {
  const router = useRouter();
  const { folderId } = router.query;
  const [deleteModal, setDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const {
    userData,
  } = useContext(TemplateContext);
  const enabled = typeof folderId === 'string';
  const {
    mutate: deleteVideo,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_VIDEO);
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
  const { data: folderData} = useQuery(['FOLDER_BY_ID', { folderId }], GET_FOLDER_BY_ID, {
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
    if (_get(videoData, 'total_number_of_videos', 0) < 15) {
      Router.push(
        `/admin/h-s-academy/${folderId}/create`,
        `/admin/h-s-academy/${folderId}/create`,
        { shallow: true },
      );
    } else {
      const otherOptions = {
        message: "Maximum 15 Videos are allowed per folder",
      };
      Message.error(null, otherOptions);
    }
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

  const handleView = (e, id) => {
    e.stopPropagation();
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
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    Router.push(
      `/admin/h-s-academy/${folderId}/${id}/edit`,
      `/admin/h-s-academy/${folderId}/${id}/edit`,
      { shallow: true },
    );
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
                <h3 className="mb-0">
                  <button className="btn btn-primary" onClick={() => Router.push(`/admin/h-s-academy`)}>
                    Back
                  </button> {_get(folderData, 'data.title', 'Videos')} - All Videos</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  {_get(videoData, 'data', []).map((video, i) => (
                    <Col md={4} key={i}>
                      <Card className="shadow cursor-pointer" onClick={e => handleView(e, _get(video, '_id', ''))}>
                        <div className="w-100 text-center">
                          <CardImg className="w-100" top width="100%" src={_get(video, 'image_id.file_url', '/img/video-svg.png')} alt="Card image cap" />
                        </div>
                        <CardHeader className="border-0">
                          <h3 className="mb-0">Title: {video.title}</h3>
                          <br />
                          {!_get(userData, 'is_admin', false) && (
                            <span>Is Watched: {_get(employeeProgressData, 'data.video_ids', []).includes(
                              _get(video, 'video_id._id')) &&
                                  <i className="ni ni-check-bold" />
                            }</span>
                          )}
                        </CardHeader>
                        <CardBody className="pt-0">
                          <h3 className="mb-0">Description: </h3>
                          <p>{ReactHtmlParser(_get(video, 'description', ''))}</p>
                        </CardBody>
                        {_get(userData, 'is_admin', false) && (
                          <CardFooter>
                            <Button className="my-1" onClick={e => handleEdit(e, _get(video, '_id', ''))}>Edit</Button>
                            <Button className="my-1" onClick={e => handleDelete(e, _get(video, '_id', ''))}>Delete</Button>
                          </CardFooter>
                        )}
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
      {/*<DynamicTable*/}
      {/*  heading="Training Folders"*/}
      {/*  tableHeadings={_get(userData, 'is_admin', false) ?*/}
      {/*    tableHeadings : tableHeadingsEmployee}*/}
      {/*  isCreateButton={_get(userData, 'is_admin', false)}*/}
      {/*  handleCreate={handleCreate}*/}
      {/*  createButtonText="Add Training Video"*/}
      {/*  paginationData={paginationData}*/}
      {/*  handleNext={handleNext}*/}
      {/*  handlePrevious={handlePrevious}*/}
      {/*  handlePageSelect={handlePageSelect}*/}
      {/*  isLoadingData={isLoading || isFetching}*/}
      {/*  noDataFound={isError || _get(videoData, 'data', []).length === 0}*/}
      {/*>*/}
      {/*  {!isError && _get(videoData, 'data', []).map((video, i) => (*/}
      {/*    <tr key={i}>*/}
      {/*      <td scope="row">*/}
      {/*        {_get(video, 'title', '-')}*/}
      {/*      </td>*/}
      {/*      {!_get(userData, 'is_admin', false) && (*/}
      {/*        <td scope="row">*/}
      {/*          {_get(employeeProgressData, 'data.video_ids', []).includes(*/}
      {/*            _get(video, 'video_id._id')) &&*/}
      {/*        <i className="ni ni-check-bold" />*/}
      {/*          }*/}
      {/*        </td>*/}
      {/*      )}*/}
      {/*      <td>*/}
      {/*        {moment(_get(video, 'createdAt', '')).format('YYYY-MM-DD')}*/}
      {/*      </td>*/}
      {/*      <TableActions*/}
      {/*        dataId={_get(video, '_id')}*/}
      {/*        isView={true}*/}
      {/*        handleView={handleView}*/}
      {/*        isEdit={_get(userData, 'is_admin', false)}*/}
      {/*        handleEdit={handleEdit}*/}
      {/*        isDelete={_get(userData, 'is_admin', false)}*/}
      {/*        handleDelete={handleDelete}*/}
      {/*      />*/}
      {/*    </tr>*/}
      {/*  ))}*/}
      {/*</DynamicTable>*/}
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
          Are you sure you want to delete Video
          <strong> {videoToDelete?.title}</strong>
        </p>
      </ConfirmationModal>
      {isLoadingDelete && <ProcessingModal />}
    </>
  );
};

export default Videos;