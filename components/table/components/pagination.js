import React from 'react';
import { Pagination, PaginationItem, PaginationLink} from "reactstrap";

type Props = {
  handleNext: any,
  handlePrevious: any,
  paginationData: any,
  handlePageSelect: any,
};
const TablePagination = (props: Props) => {
  const {
    handlePrevious,
    handleNext,
    paginationData = {},
    handlePageSelect,
  } = props;
  const {
    pages =  [],
    currentPageNo = 0,
    previousPaginationArrow = false,
    nextPaginationArrow = false,
  } = paginationData;
  return (
    <nav aria-label="...">
      <Pagination
        className="pagination justify-content-end mb-0"
        listClassName="justify-content-end mb-0"
      >
        <PaginationItem className={previousPaginationArrow && "disabled"}>
          <PaginationLink
            onClick={() => handlePrevious(paginationData?.currentPageNo)}
            tabIndex="-1"
          >
            <i className="fas fa-angle-left"/>
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {pages.map((page, i) => (
          <PaginationItem
            className={currentPageNo == page && "active"}
            key={i}
          >
            <PaginationLink
              onClick={() => handlePageSelect(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className={nextPaginationArrow && "disabled"}>
          <PaginationLink
            onClick={() => handleNext(paginationData?.currentPageNo)}
          >
            <i className="fas fa-angle-right"/>
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  );
};

export { TablePagination };