import React from 'react';
import Link from "next/link";
import Router, { useRouter } from "next/router";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import {removeLocalStorageCred} from "@/utils/local-storage";

type Props = {
  routes: Array<any>,
  logo: any,
  isRouting: boolean,
}

const SideBar = (props: Props) => {
  const { routes = [], logo = {}, isRouting } = props;
  const router = useRouter();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  const activeRoute = routeName => {
    return router.route.indexOf(routeName) > -1;
  };
  const handleLogout = () => {
    removeLocalStorageCred();
    Router.push('/admin/login', '/admin/login');
  }
  const createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <NavItem
          key={key}
          active={activeRoute(prop.layout + prop.path)}
          className={isRouting && "disabled-link"}
        >
          <Link href={prop.layout + prop.path}>
            <NavLink
              active={activeRoute(prop.layout + prop.path)}
              onClick={closeCollapse}
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </Link>
        </NavItem>
      );
    });
  };
  let navbarBrand = (
    <NavbarBrand href="#pablo" className="pt-0">
      <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
    </NavbarBrand>
  );
  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo && logo.innerLink ? (
          <Link href={logo.innerLink}>
            <span>{navbarBrand}</span>
          </Link>
        ) : null}
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link href={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : null}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          <Nav navbar>
            <NavItem
                className={isRouting && "disabled-link"}
            >
              <Link href={"/admin/login"}>
                <NavLink
                    onClick={handleLogout}
                >
                  <i className="ni ni-user-run"/>
                  Logout
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export { SideBar };