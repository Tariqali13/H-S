import React from 'react';

type Props = {
  handleNext: any,
  handlePrevious: any,
  paginationData: any,
  handlePageSelect: any,
};

const PaginationMarketingSite = (props: Props) => {
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
    <div align="center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className="page-item"
            onClick={() => handlePrevious(paginationData?.currentPageNo)}
          >
            <a className={`${previousPaginationArrow ?
              'button-disabled' : 'page-link '}`}
            >
            Previous
            </a>
          </li>
          {pages.map((page, i) => (
            <li
              className="page-item"
              key={i}
              onClick={() => handlePageSelect(page)}
            >
              <a className={`${page == currentPageNo ?
                'page-selected' : 'page-link'}`}
              >
                {page}
              </a>
            </li>
          ))}
          <li
            className="page-item"
            onClick={() => handleNext(paginationData?.currentPageNo)}
          >
            <a className={`${nextPaginationArrow ?
              'button-disabled' : 'page-link '}`}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { PaginationMarketingSite };