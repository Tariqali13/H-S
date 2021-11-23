import React from 'react';
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import {getLocalStorageValues} from "@/constants/local-storage";
import Router from "next/router";

const AuthNavBar = () => {
  const { user_id, token } = getLocalStorageValues();
  const isDashboardAllow = user_id && token;
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <span onClick={() => {
            if (isDashboardAllow) {
              Router.push('/admin/dashboard');
            }
          }}>
            <NavbarBrand>
              <img
                className="navbar-brand-login-img"
                alt="..."
                src={"/images/new-logo.png"}
              />
            </NavbarBrand>
          </span>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/" className="nav-link-icon">
                  <i className="fa fa-house-user"/>
                  <span className="nav-link-inner--text">Home</span>
                </NavLink>
              </NavItem>
              {isDashboardAllow && (
                <NavItem>
                  <NavLink href="/admin/dashboard" className="nav-link-icon">
                    <i className="ni ni-planet"/>
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export { AuthNavBar };
