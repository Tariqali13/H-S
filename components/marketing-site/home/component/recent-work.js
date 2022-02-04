import React, {useState} from "react";
import {useQuery} from "react-query";
import {GET_ALL_PRODUCTS} from "@/adminSite/products/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Pagination from "@/utils/pagination";
import _get from "lodash.get";
import ReactHtmlParser from "react-html-parser";

type Props = {
  allRes: {
    productsRes: any,
  }
}

const RecentWork = (props: Props) => {
  const { allRes } = props;
  const [productQueryParams, setProductQueryParams] = useState({
    page_no: 1,
    records_per_page: 2,
    type: 'recent_work',
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
    });
  return (
    <div className="agileinfo-work-top">
      <div className="container">
        <div className="w3-agileits-rides-heading">
          <h3 className="w3ls_head">Our Recent <span>Works</span></h3>
        </div>

        <div className="agileits-w3layouts-rides-grids">
          {!isError &&
          _get(productsData, 'data', []).map((product, i) => (
            <div className="col-sm-4 rides-grid">
              <div className="agileinfo-work">
                <div className="list-img">
                  <img src={_get(product, 'image_id.file_url', '')} className="img-responsive" alt="" />
                  <div className="textbox" >
                  </div>
                </div>
                <h4>{_get(product, 'title', '')}</h4>
                <p>{ReactHtmlParser(_get(product, 'description', ''))}</p>
              </div>
            </div>
          ))}
          {!isError && <h1>No Recent Work</h1>}
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
};
export {RecentWork};