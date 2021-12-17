import React, {useState} from 'react';
import {useQuery} from "react-query";
import {GET_ALL_PRODUCTS} from "@/adminSite/products/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import ReactHtmlParser from 'react-html-parser';
import _get from 'lodash.get';
import {SpinnerCircular} from "spinners-react";
import { PaginationMarketingSite } from './index';
import Router from 'next/router';

type Props = {
    allRes: {
        productsRes: any,
    }
}

const ProductsMine = (props: Props) => {
  const { allRes } = props;
  const [productQueryParams, setProductQueryParams] = useState({
    page_no: 1,
    records_per_page: 2,
  });
  const [paginationData, setPaginationData] = useState({});
  const {
    data: productsData,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_PRODUCTS', productQueryParams],
    GET_ALL_PRODUCTS, {
      initialData: allRes?.productsRes,
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
  const handleBook = (e, productId) => {
    e.preventDefault();
    Router.push(
      `/products?productId=${productId}`,
      `/products?productId=${productId}`,
      { shallow: true });
    // eslint-disable-next-line no-undef
    document.getElementById('booking-form').scrollIntoView();
  };
  return (
    <div className="agile-prod">
      <div className="container">
        <h2 className="w3ls_head">Serv<span>ices</span></h2>
        <p className="text-center">We Provide Professional Residential and Commercial Solar and Electrical Services.</p>
        {!isError &&
        _get(productsData, 'data', []).map((product, i) => {
          if (i % 2 === 0) {
            return (
              <div className="agile-prod1" key={i}>
                <div className="col-md-6 product-dec">
                  <h4>{_get(product, 'title', '')}</h4>
                  <p>{ReactHtmlParser(_get(product, 'description', ''))}</p>
                  <button className="button-submit" onClick={e => handleBook(e, product._id)}>
                      Book Now
                  </button>
                </div>
                <div className="col-md-6 agile-img">
                  <img src={_get(product, 'image_id.file_url', '')} alt="image"/>
                </div>
                <div className="clearfix"/>
              </div>
            );
          } else {
            return (
              <div className="agile-prod1" key={i}>
                <div className="col-md-6 agile-img">
                  <img src={_get(product, 'image_id.file_url', '')} alt="image"/>
                </div>
                <div className="col-md-6 product-dec">
                  <h4>{_get(product, 'title', '')}</h4>
                  <p>{ReactHtmlParser(_get(product, 'description', ''))}</p>
                  <button className="button-submit" onClick={e => handleBook(e, product._id)}>
                     Book Now
                  </button>
                </div>
                <div className="clearfix"/>
              </div>
            );
          }
        })}
        {(isLoading || isFetching) && (
          <div className="w-100 text-center">
            <SpinnerCircular
              size={100}
              сolor="#d7b8c0"
              style={{ color: "#000000" }}
              thickness={150}
            />
          </div>
        )}
        <PaginationMarketingSite
          paginationData={paginationData}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handlePageSelect={handlePageSelect}
        />
      </div>
    </div>
  );
};
export {ProductsMine};