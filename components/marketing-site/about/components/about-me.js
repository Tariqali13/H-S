import React from "react";
import {useQuery} from "react-query";
import {GET_ABOUT_DATA} from "@/adminSite/profile/queries";
import reactQueryConfig from "@/constants/react-query-config";
import _get from 'lodash.get';
import LazyLoadImagesMarketingSite from "@/images/lazy-load-images-marketing-site";
import ReactHtmlParser from 'react-html-parser';

type Props = {
    allRes: {
        aboutRes: any,
    }
}

const AboutMe = (props: Props) => {
  const {allRes} = props;
  const {
    data: aboutData,
  } = useQuery(
    ['ABOUT_DATA', {}], GET_ABOUT_DATA, {
      initialData: allRes?.aboutRes,
      ...reactQueryConfig,
    });
  return (
    <div className="services-w3ls">
      <div className="container">
        <h2 className="w3ls_head">About <span>Us</span></h2>
        <div className="agile_banner_bottom_grids">
          <div className="col-md-6 w3layouts_about_grid_left">
            <h4>{_get(aboutData, 'data.heading', '')}</h4>
            <p>{ReactHtmlParser(_get(aboutData, 'data.description', ''))} </p>
          </div>
          <div className="col-md-6 w3layouts_about_grid_right">
            {_get(aboutData, 'data.image_id.file_url') && (
              <LazyLoadImagesMarketingSite
                url={_get(aboutData, 'data.image_id.file_url')}
                isWidth={true}
                isHeight={true}
                width="437"
                height="435"
              />
            )}
          </div>
          <div className="clearfix"/>
        </div>
      </div>
    </div>
  );
};
export {AboutMe};