import React from 'react';
import { Col, Card, CardHeader, CardBody } from 'reactstrap';
import AuthTemplate from "@/layouts/auth-template";
import { validateLoginForm } from "./validation";
import {Formik} from "formik";
import { LoginForm } from './components';
import { LOGIN } from './queries';
import { useMutation } from "react-query";
import { Message } from '@/components/alert/message';
import { saveLocalStorageCred } from "@/utils/local-storage";
import Router from 'next/router';

const Login = () => {
  const { mutate: login, isLoading: isLoadingLogin } = useMutation(LOGIN);
  return (
    <AuthTemplate>
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in </small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validateLoginForm}
              onSubmit={async (values, actions) => {
                await login(values, {
                  onSuccess: async res => {
                    await saveLocalStorageCred(res);
                    Message.success(res);
                    Router.push(
                      "/admin/dashboard",
                      "/admin/dashboard",
                      { shallow: true },
                    );
                  },
                  onError: err => {
                    Message.error(err);
                    actions.resetForm();
                  },
                });
              }}
            >
              {formikProps => {
                return (
                  <LoginForm {...formikProps} isLoadingLogin={isLoadingLogin} />
                );}}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </AuthTemplate>
  );
};

export default Login;