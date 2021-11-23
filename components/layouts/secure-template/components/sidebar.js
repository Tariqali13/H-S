import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

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
          <Nav className="mb-md-3" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <NavItem>
                  <i
                    className="ni ni-settings"
                    style={{ minWidth: '2.25rem' }}
                  />
                    Website Settings
                </NavItem>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <Link href="/admin/home-slider">
                  <DropdownItem>
                    <i className="ni ni-building" />
                    <span>Home Slider</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/portfolio">
                  <DropdownItem>
                    <i className="ni ni-album-2" />
                    <span>Portfolio</span>
                  </DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export { SideBar };