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

const UserData = () => {
  const {
    userData,
    isLoadingUserData,
  } = useContext(TemplateContext);
  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <strong className="m-3 text-center">Profile</strong>
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
                    Name: {_get(userData, 'first_name', '')}{' '}
                    {_get(userData, 'last_name', '')}
                  </h3>
                  <div className="h5 font-weight-300">
                    Email: <i className="ni location_pin mr-2" />
                    {_get(userData, 'email', '')}
                  </div>
                  {_get(userData, 'phone_number', '') && (
                    <div className="h5 font-weight-300">
                        Phone Number: {_get(userData, 'phone_number', '')}
                    </div>
                  )}
                  {_get(userData, 'address', '') && (
                    <div className="h5 font-weight-300">
                    Address: {_get(userData, 'address', '')}
                    </div>
                  )}
                  {_get(userData, 'position', '') && (
                    <div className="h5 font-weight-300">
                        Position: {_get(userData, 'position', '')}
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {(isLoadingUserData) && <ProcessingModal />}
    </>
  );
};

export {UserData};