import React from 'react';
import { TablePagination } from './components';
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  Spinner,
} from "reactstrap";
import _get from 'lodash.get';

type Props = {
  tableHeadings: Array<any>,
  children: any,
  heading: string,
  isCreateButton: boolean,
  createButtonText: string,
  handleCreate: () => void,
  paginationData: any,
  handleNext: () => void,
  handlePrevious: () => void,
  handlePageSelect: () => void,
  isLoadingData: boolean,
  noDataFound: boolean,
}

const DynamicTable = (props: Props) => {
  const {
    tableHeadings = [],
    children,
    heading,
    isCreateButton,
    createButtonText,
    handleCreate,
    paginationData,
    handleNext,
    handlePrevious,
    handlePageSelect,
    isLoadingData,
    noDataFound,
  } = props;
  const numberOfRecords = _get(paginationData, 'totalNumberofRecord', 0);
  return (
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              {isCreateButton && (
                <Button
                  className="float-right"
                  color="primary"
                  onClick={handleCreate}
                >
                  {createButtonText || 'Create'}
                </Button>
              )}
              <h3 className="mb-0">{heading}</h3>
            </CardHeader>
            <Table
              className="align-items-center table-flush"
              responsive
              style={{
                minHeight: numberOfRecords === 1 ? "140px" : "",
              }}
            >
              <thead className="thead-light">
                <tr>
                  {tableHeadings.map((heading, i) => (
                    <th scope="col" key={i}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!isLoadingData ? children : null}
              </tbody>
            </Table>
            {isLoadingData && (
              <div className="w-100 mb-3 mt-3 text-center">
                <Spinner/>
              </div>
            )}
            {noDataFound && (
              <div className="w-100 mb-3 mt-3 text-center">
                No Data Found
              </div>
            )}
            {!isLoadingData &&
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
  );
};
export default DynamicTable;