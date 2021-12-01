import React from 'react';
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import _get from 'lodash.get';

type Props = {
    consultationData: any,
};
const ConsultationView = ( props: Props) => {
  const { consultationData } = props;
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <h6 className="heading-small text-muted mb-4">
                Consultation Detail
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="2">
                    First Name:
                  </Col>
                  <Col lg="10">
                    {_get(consultationData, 'first_name', '')}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">
                    Last Name:
                  </Col>
                  <Col lg="10">
                    {_get(consultationData, 'last_name', '')}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">
                    Email:
                  </Col>
                  <Col lg="10">
                    {_get(consultationData, 'email', '')}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">
                  Phone No:
                  </Col>
                  <Col lg="10">
                    {_get(consultationData, 'phone_number', '')}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">
                    State:
                  </Col>
                  <Col lg="10">
                    {_get(consultationData, 'state', '')}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">
                    City:
                  </Col>
                  <Col lg="10">
                    {_get(consultationData, 'city', '')}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">
                    Adress:
                  </Col>
                  <Col lg="10">
                    {_get(consultationData, 'address', '')}
                  </Col>
                </Row>
                <br />
                {/*<hr className="my-4"/>*/}
                {/*<h6 className="heading-small text-muted mb-4">*/}
                {/* Message*/}
                {/*</h6>*/}
                {/*<Row>*/}
                {/*  <Col>*/}
                {/*    {_get(consultationData, 'message', '')}*/}
                {/*  </Col>*/}
                {/*</Row>*/}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export { ConsultationView};