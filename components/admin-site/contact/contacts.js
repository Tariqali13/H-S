import React, {useState} from 'react';
import SecureTemplate from "@/layouts/secure-template";
import DynamicTable, { TableActions } from '@/components/table';
import { Stats } from '@/adminSite/common';
import { tableHeadings } from '@/constants/contact';
import Router from 'next/router';
import { GET_ALL_CONTACTS, DELETE_CONTACT } from './queries';
import { useQuery, useMutation } from "react-query";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import _get from 'lodash.get';
import { ConfirmationModal, ProcessingModal } from "@/components/modal";
import {Message} from "@/components/alert/message";

const Contacts = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const {
    mutate: deleteContact,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_CONTACT);
  const [contactQueryParams, setContactQueryParams] = useState({
    page_no: 1,
    records_per_page: 10,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: contactsData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_CONTACTS', contactQueryParams], GET_ALL_CONTACTS, {
    ...reactQueryConfig,
    onSuccess: res => {
      const { result } = Pagination(
        res.records_per_page,
        res.total_number_of_contacts,
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
    setContactQueryParams({
      ...contactQueryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = currentPage => {
    setContactQueryParams({
      ...contactQueryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = page => {
    setContactQueryParams({
      ...contactQueryParams,
      page_no: page,
    });
  };

  const handleView = id => {
    Router.push(
      `/admin/contacts/${id}`,
      `/admin/contacts/${id}`,
      { shallow: true },
    );
  };

  const handleDelete = id => {
    setDeleteModal(true);
    const findContact = _get(contactsData, 'data', []).find(
      contact => contact._id === id);
    setContactToDelete(findContact);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteContact(_get(contactToDelete, '_id', ''), {
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
    <SecureTemplate title="Contacts">
      <Stats />
      <DynamicTable
        heading="Contacts"
        tableHeadings={tableHeadings}
        isCreateButton={false}
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(contactsData, 'data', []).length === 0}
      >
        {!isError && _get(contactsData, 'data', []).map((contact, i) => (
          <tr key={i}>
            <td scope="row">
              <div className="table-data">
                {_get(contact, 'full_name', '-')}
              </div>
            </td>
            <td scope="row">
              <div className="table-data">
                {_get(contact, 'email', '-')}
              </div>
            </td>
            <td scope="row">
              <div className="table-data">
                {_get(contact, 'subject', '-')}
              </div>
            </td>
            <TableActions
              dataId={_get(contact, '_id')}
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
          <strong> {contactToDelete?.full_name}</strong>
        </p>
      </ConfirmationModal>
      {isLoadingDelete && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default Contacts;