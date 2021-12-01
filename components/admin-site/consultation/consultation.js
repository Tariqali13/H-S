import React, {useState} from 'react';
import SecureTemplate from "@/layouts/secure-template";
import DynamicTable, { TableActions } from '@/components/table';
import { Stats } from '@/adminSite/common';
import { tableHeadings } from '@/constants/consultation';
import Router from 'next/router';
import { GET_ALL_CONSULTATIONS, DELETE_CONSULTATION } from './queries';
import { useQuery, useMutation } from "react-query";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import _get from 'lodash.get';
import { ConfirmationModal, ProcessingModal } from "@/components/modal";
import {Message} from "@/components/alert/message";

const Consultation = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [consultationToDelete, setConsultationToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const {
    mutate: deleteConsultation,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_CONSULTATION);
  const [consultationQueryParams, setConsultationQueryParams] = useState({
    page_no: 1,
    records_per_page: 10,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: consultationData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_CONSULTATIONS', consultationQueryParams], GET_ALL_CONSULTATIONS, {
    ...reactQueryConfig,
    onSuccess: res => {
      const { result } = Pagination(
        res.records_per_page,
        res.total_number_of_consultation,
        res.page_no,
        res.data.length,
      );
      return setPaginationData(result);
    },
    onError: () => {
      setPaginationData({});
    },
  });

  const handleNext = currentPage => {
    setConsultationQueryParams({
      ...consultationQueryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = currentPage => {
    setConsultationQueryParams({
      ...consultationQueryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = page => {
    setConsultationQueryParams({
      ...consultationQueryParams,
      page_no: page,
    });
  };

  const handleView = id => {
    Router.push(
      `/admin/consultation/${id}`,
      `/admin/consultation/${id}`,
      { shallow: true },
    );
  };

  const handleDelete = id => {
    setDeleteModal(true);
    const findConsultation = _get(consultationData, 'data', []).find(
      consultation => consultation._id === id);
    setConsultationToDelete(findConsultation);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteConsultation(_get(consultationToDelete, '_id', ''), {
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
    <SecureTemplate title="Consultation">
      <Stats />
      <DynamicTable
        heading="Consultation"
        tableHeadings={tableHeadings}
        isCreateButton={false}
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(consultationData, 'data', []).length === 0}
      >
        {!isError && _get(consultationData, 'data', []).map((consultation, i) => (
          <tr key={i}>
            <td scope="row">
              <div className="table-data">
                {_get(consultation, 'first_name', '-')}{" "}
                {_get(consultation, 'last_name', '-')}
              </div>
            </td>
            <td scope="row">
              <div className="table-data">
                {_get(consultation, 'email', '-')}
              </div>
            </td>
            <td scope="row">
              <div className="table-data">
                {_get(consultation, 'state', '-')}
              </div>
            </td>
            <td scope="row">
              <div className="table-data">
                {_get(consultation, 'city', '-')}
              </div>
            </td>
            <td scope="row">
              <div className="table-data">
                {_get(consultation, 'phone_number', '-')}
              </div>
            </td>
            <TableActions
              dataId={_get(consultation, '_id')}
              isView={true}
              handleView={handleView}
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
            Are you sure you want to delete contact of
          <strong> {consultationToDelete?.full_name}</strong>
        </p>
      </ConfirmationModal>
      {isLoadingDelete && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default Consultation;