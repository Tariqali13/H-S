import React, {useState} from "react";
import {useQuery} from "react-query";
import {GET_ALL_PRODUCTS} from "@/adminSite/products/queries";
import reactQueryConfig from "@/constants/react-query-config";
// import Pagination from "@/utils/pagination";
import _get from "lodash.get";
import ReactHtmlParser from "react-html-parser";
import {SpinnerCircular} from "spinners-react";

type Props = {
  allRes: {
    productsRes: any,
  }
}

const RecentWork = (props: Props) => {
  const { allRes } = props;
  const [productQueryParams, setProductQueryParams] = useState({
    page_no: 1,
    records_per_page: 3,
    type: 'recent_work',
  });
  // const [paginationData, setPaginationData] = useState({});
  const {
    data: productsData,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_PRODUCTS', productQueryParams],
    GET_ALL_PRODUCTS, {
      // initialData: allRes?.productsRes,
      ...reactQueryConfig,
    });
  return (
    <div className="agileinfo-work-top">
      <div className="container">
        <div className="w3-agileits-rides-heading">
          <h3 className="w3ls_head">Our Recent <span>Works</span></h3>
        </div>

        <div className="agileits-w3layouts-rides-grids">
          <div className="row" style={{ display: "flex" }}>
            {!isError &&
          _get(productsData, 'data', []).map((product, i) => (
            <div className="col-sm-4 rides-grid">
              <div className="agileinfo-work">
                <div className="list-img">
                  <div className="flex-div">
                    <img
                      className="d-block w-100 home-slider-img blur-image"
                      src={_get(product, 'image_id.file_url', '')}
                      alt="First slide"
                      style={{ height: "300px" }}
                    />
                    <img
                      className="d-block home-slider-img main-image"
                      src={_get(product, 'image_id.file_url', '')}
                      alt="First slide"
                      style={{ height: "300px" }}

                    />
                  </div>
                  {/*<img src={_get(product, 'image_id.file_url', '')} className="img-responsive" alt="" />*/}
                  <div className="textbox" >
                  </div>
                </div>
                <h4>{_get(product, 'title', '')}</h4>
                <p>{ReactHtmlParser(_get(product, 'description', ''))}</p>
              </div>
            </div>
          ))}
          </div>
          {isError && <div className="w-100 text-center"><h1>No Recent Work</h1></div>}
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
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
};
export {RecentWork};