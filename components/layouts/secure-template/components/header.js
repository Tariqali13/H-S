import React from 'react';
import Link from "next/link";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import _get from 'lodash.get';
import Router from "next/router";
import { removeLocalStorageCred } from '@/utils/local-storage';
import LazyLoadImages from "@/components/images";
import SvgIcons from "@/components/icons";

type Props = {
  userData: any,
}
const Header = (props: Props) => {
  const {
    userData,
  } = props;
  const handleLogout = () => {
    removeLocalStorageCred();
    Router.push('/admin/login', '/admin/login');
  };
  return (
    <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
      <Container fluid>
        <Link href="/admin/dashboard">
          <a
            className="h4 mb-0 text-white
             text-uppercase d-none d-lg-inline-block"
          >
            H & S
          </a>
        </Link>
        <Nav className="align-items-center d-none d-md-flex" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  {_get(userData, 'image_id.file_url', '') ? (
                    <div className="avatar-image">
                      <LazyLoadImages
                        isHeight={true}
                        isWidth={true}
                        height={200}
                        width={200}
                        url={_get(userData, 'image_id.file_url', '')}
                        className="rounded-circle"
                      />
                    </div>
                  ) : <SvgIcons type="svg-avatar" />}
                  {/*<img*/}
                  {/*  alt="..."*/}
                  {/*  src={"/img/theme/team-4-800x800.jpg"}*/}
                  {/*/>*/}
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold">
                    {_get(userData, 'first_name', '')}{' '}
                    {_get(userData, 'last_name', '')}
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <Link href="/admin/profile">
                <DropdownItem>
                  <i className="ni ni-single-02"/>
                  <span>My profile</span>
                </DropdownItem>
              </Link>
              <DropdownItem divider/>
              <DropdownItem href="#" onClick={handleLogout}>
                <i className="ni ni-user-run"/>
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export { Header };