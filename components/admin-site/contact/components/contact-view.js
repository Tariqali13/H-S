import React from 'react';
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import _get from 'lodash.get';

type Props = {
  contactData: any,
};
const ContactView = (props: Props) => {
  const { contactData } = props;
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <h6 className="heading-small text-muted mb-4">
                  Contact Detail
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="2">
                    User Name:
                  </Col>
                  <Col lg="10">
                    {_get(contactData, 'full_name', '')}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">
                    Email:
                  </Col>
                  <Col lg="10">
                    {_get(contactData, 'email', '')}
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col lg="2">
                    Subject:
                  </Col>
                  <Col lg="10">
                    {_get(contactData, 'subject', '')}
                  </Col>
                </Row>
                <br />
                <hr className="my-4"/>
                <h6 className="heading-small text-muted mb-4">
                  Message
                </h6>
                <Row>
                  <Col>
                    {_get(contactData, 'message', '')}
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export { ContactView};