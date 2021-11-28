import React from 'react';
import { FormHeader } from "@/adminSite/common";
import SecureTemplate from "@/layouts/secure-template";
import Tabs from "@/components/tabs";
import {tabsArray} from '@/constants/profile';
import {Container, Row, Col, Card, CardBody, TabPane} from "reactstrap";
import { Profile, UpdatePassword } from './components';
import {ProcessingModal} from "@/components/modal";

const EditProfile = () => {
  return (
    <SecureTemplate title="Edit Profile">
      <FormHeader heading="Edit Profile" />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1 pt-5">
            <Card className="bg-white shadow">
              <CardBody>
                <Tabs tabsArray={tabsArray}>
                  <TabPane tabId="1">
                    <Profile />
                  </TabPane>
                  <TabPane tabId="2">
                    <UpdatePassword />
                  </TabPane>
                </Tabs>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </SecureTemplate>
  );
};
export default EditProfile;