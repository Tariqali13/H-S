import React, {useState} from 'react';
import {useMutation, useQuery} from "react-query";
import {DELETE_TESTIMONIAL, GET_ALL_TESTIMONIALS, UPDATE_TESTIMONIAL}
  from "@/adminSite/testimonial/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import _get from "lodash.get";
import Router from "next/router";
import {Message} from "@/components/alert/message";
import SecureTemplate from "@/layouts/secure-template";
import {Stats} from "@/adminSite/common";
import DynamicTable, {TableActions} from "@/components/table";
import {tableHeadings} from "@/constants/testimonial";
import moment from "moment";
import {ConfirmationModal, ProcessingModal} from "@/components/modal";
import {getLocalStorageValues} from "@/constants/local-storage";

const Testimonials = () => {
  const { user_id } = getLocalStorageValues();
  const [deleteModal, setDeleteModal] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const {
    mutate: deleteTestimonial,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_TESTIMONIAL);
  const [testimonialQueryParams, setTestimonialQueryParams] = useState({
    page_no: 1,
    records_per_page: 10,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    mutate: updateTestimonial,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_TESTIMONIAL);
  const {
    data: testimonialsData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_TESTIMONIALS', testimonialQueryParams],
    GET_ALL_TESTIMONIALS, {
      ...reactQueryConfig,
      onSuccess: res => {
        const { result } = Pagination(
          res.records_per_page,
          res.total_number_of_testimonials,
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
    if (_get(testimonialsData, 'total_number_of_testimonials',
      0) < 10) {
      Router.push(
        '/admin/testimonials/create',
        '/admin/testimonials/create',
        { shallow: true },
      );
    } else {
      const otherOptions = {
        message: "Maximum 10 testimonials are allowed",
      };
      Message.error(null, otherOptions);
    }
  };

  const handleNext = currentPage => {
    setTestimonialQueryParams({
      ...testimonialQueryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = currentPage => {
    setTestimonialQueryParams({
      ...testimonialQueryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = page => {
    setTestimonialQueryParams({
      ...testimonialQueryParams,
      page_no: page,
    });
  };

  const handleView = id => {
    Router.push(
      `/admin/testimonials/${id}`,
      `/admin/testimonials/${id}`,
      { shallow: true },
    );
  };

  const handleEdit = id => {
    Router.push(
      `/admin/testimonials/${id}/edit`,
      `/admin/testimonials/${id}/edit`,
      { shallow: true },
    );
  };

  const handleDelete = id => {
    setDeleteModal(true);
    const findTestimonial = _get(testimonialsData, 'data', []).find(
      testimonial => testimonial._id === id);
    setTestimonialToDelete(findTestimonial);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteTestimonial(_get(testimonialToDelete, '_id', ''), {
      onSuccess: async res => {
        await refetch();
        Message.success(res);
      },
      onError: err => {
        Message.error(err);
      },
    });
  };
  const handleTopReview = async (e, testimonial) => {
    const { checked } = e.target;
    if (_get(testimonialsData, 'is_top_review_testimonial', 0) > 0 && checked) {
      const otherOptions = {
        message: "Only 1 top review testimonial is allowed",
      };
      Message.error(null, otherOptions);
    } else {
      const data = {
        title: testimonial.title,
        content: testimonial.content,
        testimonial_by_name: testimonial.testimonial_by_name,
        testimonial_by_image_id: testimonial.testimonial_by_image_id._id,
        is_top_review: checked,
        updated_by: user_id,
      };
      await updateTestimonial({
        id: testimonial._id,
        data: data,
      }, {
        onSuccess: async res => {
          await refetch();
          Message.success(res);
        },
        onError: err => {
          Message.error(err);
        },
      });
    }
  };
  return (
    <SecureTemplate title="Testimonials">
      <Stats />
      <DynamicTable
        heading="Testimonials"
        tableHeadings={tableHeadings}
        isCreateButton={true}
        handleCreate={handleCreate}
        createButtonText="Create Testimonial"
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(testimonialsData, 'data', []).length === 0}
      >
        {!isError && _get(testimonialsData, 'data',
          []).map((testimonial, i) => (
          <tr key={i}>
            <td scope="row">
              <div className="table-data" style={{ maxWidth: "350px"}}>
                {_get(testimonial, 'title', '-')}
              </div>
            </td>
            <td>
              {moment(_get(testimonial, 'createdAt', '')).format('YYYY-MM-DD')}
            </td>
            <td>
              <input
                aria-label="Checkbox for following text input"
                type="checkbox"
                checked={_get(testimonial, 'is_top_review', false)}
                onChange={e => handleTopReview(e, testimonial)}
              />
            </td>
            <TableActions
              dataId={_get(testimonial, '_id')}
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
          Are you sure you want to delete Testimonial
          <strong> {testimonialToDelete?.title}</strong>
        </p>
      </ConfirmationModal>
      {(isLoadingDelete || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};
export default Testimonials;