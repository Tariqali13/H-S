import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import {DELETE_VIDEO, GET_ALL_VIDEOS} from "@/adminSite/videos/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import Router from "next/router";
import _get from "lodash.get";
import {Message} from "@/components/alert/message";
import SecureTemplate from "@/layouts/secure-template";
import {Stats} from "@/adminSite/common";
import DynamicTable, {TableActions} from "@/components/table";
import {tableHeadings} from "@/constants/video";
import moment from "moment";
import {ConfirmationModal, ProcessingModal} from "@/components/modal";

const Videos = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const {
    mutate: deleteVideo,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_VIDEO);
  const [videoQueryParams, setVideoQueryParams] = useState({
    page_no: 1,
    records_per_page: 100,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: videoData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_VIDEOS', videoQueryParams], GET_ALL_VIDEOS, {
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
  console.log("VideoData", videoData)
  const handleCreate = () => {
    if (_get(videoData, 'total_number_of_Video', 0) < 50) {
      Router.push(
        '/admin/training-videos/create',
        '/admin/training-videos/create',
        { shallow: true },
      );
    } else {
      const otherOptions = {
        message: "Maximum 50 Videos are allowed",
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

  const handleView = id => {
    Router.push(
      `/admin/training-videos/${id}`,
      `/admin/training-videos/${id}`,
      { shallow: true },
    );
  };

  const handleEdit = id => {
    Router.push(
      `/admin/training-videos/${id}/edit`,
      `/admin/training-videos/${id}/edit`,
      { shallow: true },
    );
  };

  const handleDelete = id => {
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
    <SecureTemplate title="Videos">
      <Stats />
      <DynamicTable
        heading="Training Videos"
        tableHeadings={tableHeadings}
        isCreateButton={true}
        handleCreate={handleCreate}
        createButtonText="Add Training Video"
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(videoData, 'data', []).length === 0}
      >
        {!isError && _get(videoData, 'data', []).map((video, i) => (
          <tr key={i}>
            <td scope="row">
              {_get(video, 'title', '-')}
            </td>
            <td>
              {moment(_get(video, 'createdAt', '')).format('YYYY-MM-DD')}
            </td>
            <TableActions
              dataId={_get(video, '_id')}
              isView={true}
              handleView={handleView}
              isEdit={true}
              handleEdit={handleEdit}
              isDelete={true}
              handleDelete={handleDelete}
            />
          </tr>
        ))}
      </DynamicTable>
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
    </SecureTemplate>
  );
};

export default Videos;