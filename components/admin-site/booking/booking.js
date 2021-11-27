import React, {useState} from 'react';
import SecureTemplate from "@/layouts/secure-template";
import DynamicTable, { TableActions } from '@/components/table';
import { Stats } from '@/adminSite/common';
import { tableHeadings } from '@/constants/booking';
import Router from 'next/router';
import { GET_ALL_BOOKINGS, DELETE_BOOKING } from './queries';
import { useQuery, useMutation } from "react-query";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import _get from 'lodash.get';
import moment from "moment";
import {ConfirmationModal, ProcessingModal} from "@/components/modal";
import {Message} from "@/components/alert/message";

const Booking = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const {
    mutate: deleteBooking,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_BOOKING);
  const [bookingQueryParams, setBookingQueryParams] = useState({
    page_no: 1,
    records_per_page: 10,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: bookingData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_BOOKINGS', bookingQueryParams], GET_ALL_BOOKINGS, {
    ...reactQueryConfig,
    onSuccess: res => {
      const { result } = Pagination(
        res.records_per_page,
        res.total_number_of_bookings,
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
      '/admin/bookings/create',
      '/admin/bookings/create',
      { shallow: true },
    );
  };

  const handleNext = currentPage => {
    setBookingQueryParams({
      ...bookingQueryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = currentPage => {
    setBookingQueryParams({
      ...bookingQueryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = page => {
    setBookingQueryParams({
      ...bookingQueryParams,
      page_no: page,
    });
  };

  const handleView = id => {
    Router.push(
      `/admin/bookings/${id}`,
      `/admin/bookings/${id}`,
      { shallow: true },
    );
  };

  const handleEdit = id => {
    Router.push(
      `/admin/bookings/${id}/edit`,
      `/admin/bookings/${id}/edit`,
      { shallow: true },
    );
  };

  const handleDelete = id => {
    setDeleteModal(true);
    const findBooking = _get(bookingData, 'data', []).find(
      booking => booking._id === id);
    setBookingToDelete(findBooking);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteBooking(_get(bookingToDelete, '_id', ''), {
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
    <SecureTemplate title="Bookings">
      <Stats />
      <DynamicTable
        heading="Bookings"
        tableHeadings={tableHeadings}
        isCreateButton={true}
        handleCreate={handleCreate}
        createButtonText="Create Booking"
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(bookingData, 'data', []).length === 0}
      >
        {!isError && _get(bookingData, 'data', []).map((booking, i) => (
          <tr key={i}>
            <td scope="row">
              {_get(booking, 'full_name', '-')}
            </td>
            <td>
              {_get(booking, 'email', '-')}
            </td>
            <td>
              {_get(booking, 'state', '-')}
            </td>
            <td>
              {_get(booking, 'city', '-')}
            </td>
            <td>
              {moment(_get(booking, 'event_date', '')).format('YYYY-MM-DD')}
            </td>
            <td>
              {_get(booking, 'pricing_plan.heading', '-')}
            </td>
            <TableActions
              dataId={_get(booking, '_id')}
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
          Are you sure you want to delete booking of
          <strong> {bookingToDelete?.full_name}</strong>
        </p>
      </ConfirmationModal>
      {isLoadingDelete && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default Booking;