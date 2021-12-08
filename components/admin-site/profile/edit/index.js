import React, {useContext} from 'react';
import { FormHeader } from "@/adminSite/common";
import Tabs from "@/components/tabs";
import {tabsArray} from '@/constants/profile';
import {Container, Row, Col, Card, CardBody, TabPane} from "reactstrap";
import { Profile, UpdatePassword, About } from './components';
import { GET_ABOUT_DATA } from '../queries';
import { useQuery } from "react-query";
import reactQueryConfig from "@/constants/react-query-config";
import _get from 'lodash.get';
import TemplateContext from "@/layouts/secure-template/context";

const EditProfile = () => {
  const { data: aboutData, isLoading: isLoadingAbout, refetch: refetchAboutData } = useQuery(
    ['ABOUT_DATA', {}], GET_ABOUT_DATA, {
      ...reactQueryConfig,
    });
  const {
    userData,
  } = useContext(TemplateContext);
  return (
    <>
      <FormHeader heading="Edit Profile" />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1 pt-5">
            <Card className="bg-white shadow">
              <CardBody>
                <Tabs tabsArray={tabsArray(_get(userData, 'is_admin', false))}>
                  <TabPane tabId="1">
                    <Profile />
                  </TabPane>
                  <TabPane tabId="2">
                    <UpdatePassword />
                  </TabPane>
                  {_get(userData, 'is_admin', false) && (
                    <TabPane tabId="3">
                      <About
                        type="left_image"
                        aboutData={_get(aboutData, 'data', {})}
                        isLoadingAbout={isLoadingAbout}
                        refetchAboutData={refetchAboutData}
                      />
                    </TabPane>
                  )}
                </Tabs>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditProfile;