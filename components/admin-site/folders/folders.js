import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {DELETE_FOLDER, GET_ALL_FOLDERS} from "@/adminSite/folders/queries";
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
} from "reactstrap";
import ReactHtmlParser from 'react-html-parser';
import {TablePagination} from "@/components/table";

const Folders = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const {
    userData,
  } = useContext(TemplateContext);
  const {
    mutate: deleteFolder,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_FOLDER);
  const [folderQueryParams, setFolderQueryParams] = useState({
    page_no: 1,
    records_per_page: 100,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: folderData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_FOLDERS', folderQueryParams], GET_ALL_FOLDERS, {
    ...reactQueryConfig,
    onSuccess: res => {
      const { result } = Pagination(
        res.records_per_page,
        res.total_number_of_folders,
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
    if (_get(folderData, 'total_number_of_Folders', 0) < 50) {
      Router.push(
        '/admin/h-s-academy/create',
        '/admin/h-s-academy/create',
        { shallow: true },
      );
    } else {
      const otherOptions = {
        message: "Maximum 50 Folders are allowed",
      };
      Message.error(null, otherOptions);
    }
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
                  {_get(folderData, 'data', []).map((folder, i) => (
                    <Col md={4} key={i}>
                      <Card className="shadow cursor-pointer" onClick={e => handleView(e, _get(folder, '_id', ''))}>
                        <div className="w-100 text-center">
                          <CardImg className="w-100" top width="100%" src={_get(folder, 'image_id.file_url', '/img/folder-svg.png')} alt="Card image cap" />
                        </div>
                        <CardHeader className="border-0">
                          <h3 className="mb-0">Title: {folder.title}</h3>
                          <h3 className="mb-0">Total Videos: {_get(folder, 'total_videos', 0)}</h3>
                        </CardHeader>
                        <CardBody className="pt-0">
                          <h3 className="mb-0">Description: </h3>
                          <p>{ReactHtmlParser(_get(folder, 'description', ''))}</p>
                        </CardBody>
                        {_get(userData, 'is_admin', false) && (
                          <CardFooter>
                            <Button className="my-1" onClick={e => handleEdit(e, _get(folder, '_id', ''))}>Edit</Button>
                            <Button className="my-1" onClick={e => handleDelete(e, _get(folder, '_id', ''))}>Delete</Button>
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
      {isLoadingDelete && <ProcessingModal />}
    </>
  );
};

export default Folders;