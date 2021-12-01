import React from 'react';
import {Button, Card, CardBody, Col, Container, Row, Spinner} from "reactstrap";
import _get from 'lodash.get';
import HtmlParser from "react-html-parser";
import ReactPlayer from "react-player/lazy";
import { CREATE_EMPLOYEE_PROGRESS } from '../queries';
import { useMutation } from "react-query";
import {getLocalStorageValues} from "@/constants/local-storage";
import {Message} from "@/components/alert/message";
import Router from "next/router";

type Props = {
    videoData: any,
};
const EmployeeVideoView = (props: Props) => {
  const { videoData } = props;
  const { user_id } = getLocalStorageValues();
  const { mutate: createEmployeeProgress, isLoading } = useMutation(CREATE_EMPLOYEE_PROGRESS);
  const handleContinue = async () => {
    await createEmployeeProgress({
      employee_id: user_id,
      video_id: _get(videoData, 'video_id._id', ''),
      created_by: user_id,
    }, {
      onSuccess: () => {
        const otherOption = {
          message: "Video marked as completed",
        };
        Message.success(null, otherOption);
        Router.push(
          "/admin/training-videos",
          "/admin/training-videos",
          { shallow: true },
        );
      },
      onError: err => {
        Message.error(err);
      },
    });
  };
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="order-xl-1 pt-5">
          <Card className="bg-white shadow">
            <CardBody>
              <h6 className="heading-small text-muted mb-4">
                  Video Detail
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="2">
                      Title:
                  </Col>
                  <Col lg="10">
                    {_get(videoData, 'title', '')}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="2">
                      Description:
                  </Col>
                  <Col lg="10">
                    {HtmlParser(_get(videoData, 'description', ''))}
                  </Col>
                </Row>
                <br />
                <hr className="my-4"/>
                <h6 className="heading-small text-muted mb-4">
                    Video
                </h6>
                <Row>
                  <ReactPlayer
                    controls={true}
                    url={_get(videoData,
                      'video_id.file_url',
                      '')}
                  />
                </Row>
                <Row>
                  <Button
                    className="btn-icon btn-3 my-4"
                    color="primary float-right"
                    type="button"
                    disabled={isLoading}
                    onClick={handleContinue}
                  >
                    <span className="btn-inner--text">
                      Complete and Continue
                    </span>
                    <span className="btn-inner--icon">
                      {isLoading && <Spinner size="sm"/>}
                    </span>
                  </Button>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export { EmployeeVideoView };