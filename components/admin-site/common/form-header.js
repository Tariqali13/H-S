import React, { useContext } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import Router from 'next/router';
import TemplateContext from "@/layouts/secure-template/context";
import _get from 'lodash.get';

type Props = {
  heading: string,
  isProfile?: boolean,
};

const FormHeader = (props: Props) => {
  const { heading, isProfile = false } = props;
  const { userData } = useContext(TemplateContext);
  const handleEditProfile = e => {
    e.preventDefault();
    Router.push(
      '/admin/profile/edit',
      '/admin/profile/edit',
      { shallow: true },
    );
  };

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "200px",
          backgroundImage: "/img/theme/profile-cover.jpg",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />
        <Container className="d-flex align-items-center" fluid>
          {!isProfile && (
            <Row className="form-header-row w-100">
              <Col lg="1">
                <Button
                  size="small"
                  className="back-button"
                  onClick={() => Router.back()}
                >
                  <i className="ni ni-bold-left"/>
                </Button>
              </Col>
              <Col lg="10">
                <h1 className="display-2 text-white">{heading || 'Create'}</h1>
              </Col>
            </Row>
          )}
          {isProfile && (
            <Row>
              <Col lg="12" md="10">
                <h1 className="display-2 text-white">
                  Hello {_get(userData, 'first_name', '')}{" "}
                  {_get(userData, 'last_name', '')}
                </h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can update your profile here.
                </p>
                <Button
                  color="primary"
                  onClick={handleEditProfile}
                >
                  Edit profile
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export { FormHeader };
