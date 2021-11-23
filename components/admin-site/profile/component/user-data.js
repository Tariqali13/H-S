import React, {useContext} from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import SvgIcons from '@/components/icons';
import TemplateContext from "@/layouts/secure-template/context";
import _get from 'lodash.get';
import {ProcessingModal} from "@/components/modal";
import LazyLoadImages from "@/components/images";
import ReactHtmlParser from 'react-html-parser';
import {useQuery} from "react-query";
import {GET_ABOUT_DATA} from "@/adminSite/profile/queries";
import reactQueryConfig from "@/constants/react-query-config";

const UserData = () => {
  const {
    userData,
    isLoadingUserData,
  } = useContext(TemplateContext);
  const {
    data: aboutData,
    isLoading: isLoadingAbout,
  } = useQuery(['ABOUT_DATA'], GET_ABOUT_DATA, {
    ...reactQueryConfig,
  });
  const homeAbout = _get(aboutData, 'data', []).find(
    about => about.type === 'home');
  const leftImageAbout = _get(aboutData, 'data', []).find(
    about => about.type === 'left_image');
  const rightImageAbout = _get(aboutData, 'data', []).find(
    about => about.type === 'right_image');
  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <strong className="m-3 text-center">Admin Profile</strong>
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  {_get(userData, 'image_id.file_url', '') ? (
                    <div className="avatar-image">
                      <LazyLoadImages
                        isHeight={true}
                        isWidth={true}
                        width={200}
                        height={200}
                        url={_get(userData, 'image_id.file_url', '')}
                        className="rounded-circle"
                      />
                    </div>
                  ) : <SvgIcons type="svg-avatar" />}
                </Col>
              </Row>
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <h3>
                    {_get(userData, 'first_name', '')}{' '}
                    {_get(userData, 'last_name', '')}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {_get(userData, 'email', '')}
                  </div>
                  <hr className="my-4" />
                  <strong className="m-3">Home About</strong>
                  <Row className="justify-content-center mt-4">
                    <Col className="order-lg-2" lg="3">
                      {_get(homeAbout, 'image_id.file_url', '') ? (
                        <div className="avatar-image">
                          <LazyLoadImages
                            isHeight={true}
                            isWidth={true}
                            width={200}
                            height={200}
                            url={_get(homeAbout, 'image_id.file_url', '')}
                            className="rounded-circle"
                          />
                        </div>
                      ) : <SvgIcons type="svg-avatar" />}
                    </Col>
                  </Row>
                  <div className="mt-4 w-100 text-left">
                    <i className="ni education_hat mr-2" />
                    <strong className="m-3">Heading: </strong>
                    {_get(homeAbout, 'heading', '')}
                  </div>
                  <div className="mt-4 w-100 text-left">
                    <strong className="m-3">Description: </strong>
                    <p className="w-75 m-auto">
                      {ReactHtmlParser(
                        _get(homeAbout, 'description', ''),
                      )}
                    </p>
                  </div>
                  <hr className="my-4" />
                  <strong className="m-3">Left Image About</strong>
                  <Row className="justify-content-center mt-4">
                    <Col className="order-lg-2" lg="3">
                      {_get(leftImageAbout, 'image_id.file_url', '') ? (
                        <div className="avatar-image">
                          <LazyLoadImages
                            isHeight={true}
                            isWidth={true}
                            width={200}
                            height={200}
                            url={_get(leftImageAbout, 'image_id.file_url', '')}
                            className="rounded-circle"
                          />
                        </div>
                      ) : <SvgIcons type="svg-avatar" />}
                    </Col>
                  </Row>
                  <div className="mt-4 w-100 text-left">
                    <i className="ni education_hat mr-2" />
                    <strong className="m-3">Heading: </strong>
                    {_get(leftImageAbout, 'heading', '')}
                  </div>
                  <div className="mt-4 w-100 text-left">
                    <strong className="m-3">Description: </strong>
                    <p className="w-75 m-auto">
                      {ReactHtmlParser(
                        _get(leftImageAbout, 'description', ''),
                      )}
                    </p>
                  </div>
                  <hr className="my-4" />
                  <strong className="m-3">Right Image About</strong>
                  <Row className="justify-content-center mt-4">
                    <Col className="order-lg-2" lg="3">
                      {_get(rightImageAbout, 'image_id.file_url', '') ? (
                        <div className="avatar-image">
                          <LazyLoadImages
                            isHeight={true}
                            isWidth={true}
                            width={200}
                            height={200}
                            url={_get(rightImageAbout, 'image_id.file_url', '')}
                            className="rounded-circle"
                          />
                        </div>
                      ) : <SvgIcons type="svg-avatar" />}
                    </Col>
                  </Row>
                  <div className="mt-4 w-100 text-left">
                    <i className="ni education_hat mr-2" />
                    <strong className="m-3">Heading: </strong>
                    {_get(rightImageAbout, 'heading', '')}
                  </div>
                  <div className="mt-4 w-100 text-left">
                    <strong className="m-3">Description: </strong>
                    <p className="w-75 m-auto">
                      {ReactHtmlParser(
                        _get(rightImageAbout, 'description', ''),
                      )}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {(isLoadingUserData || isLoadingAbout) && <ProcessingModal />}
    </>
  );
};

export {UserData};