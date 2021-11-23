import React, {useState} from 'react';
import { Header, Footer, SideBar } from './components';
import { Container } from "reactstrap";
import routes from "@/constants/secure-template";
import { SecureHead } from "@/layouts/secure-template/secure-head";
import MyComponent from 'react-fullpage-custom-loader';
import Router from 'next/router';
import { GET_USER_BY_ID } from './queries';
import { useQuery } from "react-query";
import reactQueryConfig from "@/constants/react-query-config";
import {getLocalStorageValues} from "@/constants/local-storage";
import TemplateContext from './context';
import _get from 'lodash.get';
import { removeLocalStorageCred } from '@/utils/local-storage';

type Props = {
  children: any,
  title: string,
}
const SecureTemplate = (props: Props) => {
  const { children, title } = props;
  const { user_id } = getLocalStorageValues();
  const TemplateProvider = TemplateContext.Provider;
  const isEnabled = typeof user_id === "string";
  const {
    data: userData,
    refetch: refetchUserData,
    isLoading: isLoadingUserData,
  } = useQuery(['GET_USER_BY_ID',  { userId: user_id }], GET_USER_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: async () => {
      await removeLocalStorageCred();
      Router.push('/admin/login', '/admin/login', { shallow: true });
    },
  });
  const [isRouting, setIsRouting] = useState(false);
  Router.events.on("routeChangeStart", () => {
    setIsRouting(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setIsRouting(false);
  });
  Router.events.on("routeChangeError", () => {
    setIsRouting(false);
  });
  return (
    <TemplateProvider
      value={{
        userData: _get(userData, 'data', {}),
        refetchUserData: refetchUserData,
        isLoadingUserData: isLoadingUserData,
      }}
    >
      <SecureHead title={title} />
      <SideBar
        {...props}
        routes={routes}
        isRouting={isRouting}
        logo={{
          innerLink: "/admin/dashboard",
          outterLink: "/admin/dashboard",
          imgSrc: "/images/new-logo.png",
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        {isRouting && (
          <MyComponent width={"100%"} height={"100%"}/>
        )}
        <Header
          {...props}
          userData={_get(userData, 'data', {})}
          isLoadingUserData={isLoadingUserData}
        />
        {children}
        <Container fluid>
          <Footer />
        </Container>
      </div>
    </TemplateProvider>
  );
};
export default SecureTemplate;