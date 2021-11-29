import React, {useState} from 'react';
import {useMutation, useQuery} from "react-query";
import {DELETE_EMPLOYEE, GET_ALL_EMPLOYEES, UPDATE_EMPLOYEE}
  from "@/adminSite/employee/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import _get from "lodash.get";
import Router from "next/router";
import {Message} from "@/components/alert/message";
import SecureTemplate from "@/layouts/secure-template";
import {Stats} from "@/adminSite/common";
import DynamicTable, {TableActions} from "@/components/table";
import {tableHeadings} from "@/constants/employee";
import moment from "moment";
import {ConfirmationModal, ProcessingModal} from "@/components/modal";
import {getLocalStorageValues} from "@/constants/local-storage";

const Employees = () => {
  const { user_id } = getLocalStorageValues();
  const [deleteModal, setDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState({});
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const {
    mutate: deleteEmployee,
    isLoading: isLoadingDelete,
  } = useMutation(DELETE_EMPLOYEE);
  const [employeeQueryParams, setEmployeeQueryParams] = useState({
    page_no: 1,
    records_per_page: 10,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    mutate: updateEmployee,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_EMPLOYEE);
  const {
    data: employeesData,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_EMPLOYEES', employeeQueryParams],
    GET_ALL_EMPLOYEES, {
      ...reactQueryConfig,
      onSuccess: res => {
        const { result } = Pagination(
          res.records_per_page,
          res.total_number_of_employees,
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
    if (_get(employeesData, 'total_number_of_employees',
      0) < 10) {
      Router.push(
        '/admin/employees/create',
        '/admin/employees/create',
        { shallow: true },
      );
    } else {
      const otherOptions = {
        message: "Maximum 10 employee are allowed",
      };
      Message.error(null, otherOptions);
    }
  };

  const handleNext = currentPage => {
    setEmployeeQueryParams({
      ...employeeQueryParams,
      page_no: parseInt(currentPage) + 1,
    });
  };
  const handlePrevious = currentPage => {
    setEmployeeQueryParams({
      ...employeeQueryParams,
      page_no: parseInt(currentPage) - 1,
    });
  };
  const handlePageSelect = page => {
    setEmployeeQueryParams({
      ...employeeQueryParams,
      page_no: page,
    });
  };

  const handleView = id => {
    Router.push(
      `/admin/employees/${id}`,
      `/admin/employees/${id}`,
      { shallow: true },
    );
  };

  const handleEdit = id => {
    Router.push(
      `/admin/employees/${id}/edit`,
      `/admin/employees/${id}/edit`,
      { shallow: true },
    );
  };

  const handleDelete = id => {
    setDeleteModal(true);
    const findEmployee = _get(employeesData, 'data', []).find(
      employee => employee._id === id);
    setEmployeeToDelete(findEmployee);
  };
  const handleConfirmDelete = async () => {
    toggleDeleteModal();
    await deleteEmployee(_get(employeeToDelete, '_id', ''), {
      onSuccess: async res => {
        await refetch();
        Message.success(res);
      },
      onError: err => {
        Message.error(err);
      },
    });
  }
  const handleActive = async (e, employee) => {
    const { checked } = e.target;
      const data = {
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        image_id: employee.image_id._id,
        is_active: checked,
        updated_by: user_id,
      };
      await updateEmployee({
        id: employee._id,
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
  };
  return (
    <SecureTemplate title="Employees">
      <Stats />
      <DynamicTable
        heading="Employees"
        tableHeadings={tableHeadings}
        isCreateButton={true}
        handleCreate={handleCreate}
        createButtonText="Create Employee"
        paginationData={paginationData}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePageSelect={handlePageSelect}
        isLoadingData={isLoading || isFetching}
        noDataFound={isError || _get(employeesData, 'data', []).length === 0}
      >
        {!isError && _get(employeesData, 'data',
          []).map((employee, i) => (
          <tr key={i}>
            <td scope="row">
              <div className="table-data" style={{ maxWidth: "350px"}}>
                {_get(employee , 'first_name', '_')}
              </div>
            </td>
            <td>
              {_get(employee, 'last_name', '-')}
            </td>
            <td>
              {_get(employee, 'email', '-')}
            </td>
            <td>
              <input
                aria-label="Checkbox for following text input"
                type="checkbox"
                checked={_get(employee, 'is_active', false)}
                onChange={e => handleActive(e, employee)}
              />
            </td>
            <TableActions
              dataId={_get(employee, '_id')}
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
          Are you sure you want to delete Employee
          <strong> {employeeToDelete?.first_name}</strong>
        </p>
      </ConfirmationModal>
      {(isLoadingDelete || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};
export default Employees;