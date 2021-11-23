import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {AuthNavBar} from "@/layouts/auth-template/components";
import {AuthFooter } from "@/layouts/auth-template/components";
import { SecureHead } from "@/layouts/secure-template";

type Props = {
  children: any,
}
function AuthTemplate(props: Props) {
  const { children } = props;
  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    document.body.classList.add("bg-default");
    return function cleanup() {
      // eslint-disable-next-line no-undef
      document.body.classList.remove("bg-default");
    };
  }, []);
  return (
    <>
      <SecureHead title="Login" />
      <div className="main-content">
        <AuthNavBar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                  <p className="text-lead">
                    Login to admin dashboard.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >

            </svg>
          </div>
        </div>
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">{children}</Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
}
export default AuthTemplate;
