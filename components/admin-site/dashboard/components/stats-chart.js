import React from 'react';
import classnames from "classnames";
// import Chart from "chart.js";
// import { Line, Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import {getLocalStorageValues} from "@/constants/local-storage";
import {useQuery} from "react-query";
import {GET_DASHBOARD_STATS} from "@/adminSite/common/queries";
import reactQueryConfig from "@/constants/react-query-config";
import ApexChart from "@/components/apex-chart";
import { lineChartOptions } from '@/constants/dashboard';
import _get from 'lodash.get';

const StatsChart = () => {
  const [activeNav, setActiveNav] = React.useState(1);
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };
  const { user_id } = getLocalStorageValues();
  const isEnabled = typeof user_id === 'string';
  const { data: dashboardData } = useQuery(
    ['DASHBOARD_STATS', { user_id: user_id }],
    GET_DASHBOARD_STATS,
    {
      ...reactQueryConfig,
      enabled: isEnabled,
    });

  const labels = data => data.map(item => _get(item, 'x'));
  const calculateGraphValues = (data = []) => {
    return data.map(item => item.y.length);
  };
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="mb-5 mb-xl-0" xl="12">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  <h6 className="text-uppercase text-light ls-1 mb-1">
                    Overview
                  </h6>
                  <h2 className="text-white mb-0">Sales value</h2>
                </div>
                <div className="col">
                  <Nav className="justify-content-end" pills>
                    <NavItem>
                      <NavLink
                        className={classnames("py-2 px-3", {
                          active: activeNav === 1,
                        })}
                        onClick={() => {}}
                      >
                        <span className="d-none d-md-block">Full Year</span>
                        <span className="d-md-none">Y</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              {/* Chart */}
              <div className="chart">
                <ApexChart
                  options={lineChartOptions(
                    labels(_get(dashboardData, 'data.bookingArray', [])),
                  )}
                  series={[
                    {
                      name: 'Bookings',
                      data: calculateGraphValues(
                        _get(dashboardData, 'data.bookingArray', []),
                      ),
                    },
                  ]}
                  type="area"
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export { StatsChart };