import React, {useState} from 'react';
import {useMutation, useQuery} from "react-query";
import {DELETE_PRODUCT, GET_ALL_PRODUCTS}
  from "@/adminSite/products/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import _get from "lodash.get";
import Router from "next/router";
import {Message} from "@/components/alert/message";
import SecureTemplate from "@/layouts/secure-template";
import {Stats} from "@/adminSite/common";
import DynamicTable, {TableActions} from "@/components/table";
import {tableHeadings} from "@/constants/products";
import moment from "moment";
import {ConfirmationModal, ProcessingModal} from "@/components/modal";
import {getLocalStorageValues} from "@/constants/local-storage";

const Products = () => {
  const { user_id } = getLocalStorageValues();
  const [deleteModal, setDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const {
    mutate: deleteProduct,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_PRODUCT);
  const [productQueryParams, setProductQueryParams] = useState({
    page_no: 1,
    records_per_page: 10,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: productsData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_PRODUCTS', productQueryParams],
    GET_ALL_PRODUCTS, {
      ...reactQueryConfig,
      onSuccess: res => {
        const { result } = Pagination(
          res.records_per_page,
          res.total_number_of_products,
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
    if (_get(productsData, 'total_number_of_products',
      0) < 10) {
      Router.push(
        '/admin/products/create',
        '/admin/products/create',
        { shallow: true },
      );
    } else {
      const otherOptions = {
        message: "Maximum 10 Products are allowed",
      };
      Message.error(null, otherOptions);
    }
  };

  const handleNext = currentPage => {
    setProductQueryParams({
      ...productQueryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = currentPage => {
    setProductQueryParams({
      ...productQueryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = page => {
    setProductQueryParams({
      ...productQueryParams,
      page_no: page,
    });
  };

  const handleView = id => {
    Router.push(
      `/admin/products/${id}`,
      `/admin/products/${id}`,
      { shallow: true },
    );
  };

  const handleEdit = id => {
    Router.push(
      `/admin/products/${id}/edit`,
      `/admin/products/${id}/edit`,
      { shallow: true },
    );
  };

  const handleDelete = id => {
    setDeleteModal(true);
    const findProduct = _get(productsData, 'data', []).find(
      product => product._id === id);
    setProductToDelete(findProduct);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteProduct(_get(productToDelete, '_id', ''), {
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
    <SecureTemplate title="Products">
      <Stats />
      <DynamicTable
        heading="Products"
        tableHeadings={tableHeadings}
        isCreateButton={true}
        handleCreate={handleCreate}
        createButtonText="Create Product"
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(productsData, 'data', []).length === 0}
      >
        {!isError && _get(productsData, 'data',
          []).map((product, i) => (
          <tr key={i}>
            <td scope="row">
              <div className="table-data" style={{ maxWidth: "350px"}}>
                {_get(product, 'title', '-')}
              </div>
            </td>
            <td>
              {moment(_get(product, 'createdAt', '')).format('YYYY-MM-DD')}
            </td>
            <TableActions
              dataId={_get(product, '_id')}
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
          Are you sure you want to delete Product
          <strong> {productToDelete?.title}</strong>
        </p>
      </ConfirmationModal>
      {isLoadingDelete && <ProcessingModal />}
    </SecureTemplate>
  );
};
export default Products;