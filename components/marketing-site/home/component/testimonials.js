import React from 'react';
import {Carousel} from "react-bootstrap";
import {useQuery} from "react-query";
import {GET_ALL_TESTIMONIALS} from "@/adminSite/testimonial/queries";
import reactQueryConfig from "@/constants/react-query-config";
import {SpinnerCircular} from "spinners-react";
import ReactHtmlParser from 'react-html-parser';
import _get from 'lodash.get';

type Props = {
    allRes: {
        testimonialsRes: any,
    }
}

const Testimonials = (props: Props) => {
  const { allRes } = props;
  const {
    data: testimonialsData,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['ALL_TESTIMONIALS', {}],
    GET_ALL_TESTIMONIALS, {
      initialData: allRes?.testimonialsRes,
      ...reactQueryConfig,
    });
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {!isError &&
          _get(testimonialsData, 'data', []).length > 0 && (
            <Carousel fade indicators={false} className="owl-carousel">
              {_get(testimonialsData, 'data', []).map(
                (testimonial, i) => (
                  <Carousel.Item key={i}>
                    <div className="testimonial">
                      <div className="pic">
                        <img src={_get(testimonial,
                          'testimonial_by_image_id.file_url', '')}/>
                      </div>
                      <div className="testimonial-profile">
                        <h3 className="title">
                          {_get(testimonial,
                            'testimonial_by_name', '')}
                        </h3>
                      </div>
                      <p className="title">
                        {_get(testimonial, 'title', '')}
                      </p>
                      <p className="description" >
                        {ReactHtmlParser(_get(testimonial, 'content', ''))}
                      </p>
                    </div>
                  </Carousel.Item>
                ))}
            </Carousel>
          )}
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
        </div>
      </div>
    </div>
  );
};
export { Testimonials };