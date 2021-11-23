import React from 'react';
import { FormHeader } from "@/adminSite/common";
import SecureTemplate from "@/layouts/secure-template";
import Tabs from "@/components/tabs";
import {tabsArray} from '@/constants/profile';
import {Container, Row, Col, Card, CardBody, TabPane} from "reactstrap";
import { Profile, About, UpdatePassword } from './components';
import {useQuery} from "react-query";
import {GET_ABOUT_DATA} from "@/adminSite/profile/queries";
import reactQueryConfig from "@/constants/react-query-config";
import {ProcessingModal} from "@/components/modal";
import _get from "lodash.get";
const EditProfile = () => {
  const {
    data: aboutData,
    isLoading: isLoadingAbout,
    refetch: refetchAboutData,
  } = useQuery(['ABOUT_DATA'], GET_ABOUT_DATA, {
    ...reactQueryConfig,
  });
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
                    <About
                      type="left_image"
                      aboutData={_get(aboutData, 'data', [])}
                      isLoadingAbout={isLoadingAbout}
                      refetchAboutData={refetchAboutData}
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <About
                      type="right_image"
                      aboutData={_get(aboutData, 'data', [])}
                      isLoadingAbout={isLoadingAbout}
                      refetchAboutData={refetchAboutData}
                    />
                  </TabPane>
                  <TabPane tabId="4">
                    <About
                      type="home"
                      aboutData={_get(aboutData, 'data', [])}
                      isLoadingAbout={isLoadingAbout}
                      refetchAboutData={refetchAboutData}
                    />
                  </TabPane>
                  <TabPane tabId="5">
                    <UpdatePassword />
                  </TabPane>
                </Tabs>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {isLoadingAbout && <ProcessingModal />}
    </SecureTemplate>
  );
};
export default EditProfile;