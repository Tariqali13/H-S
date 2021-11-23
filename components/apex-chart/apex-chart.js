import React, { useEffect, useState } from 'react';

let Chart;
type Props = {
  options: any,
  series: any,
  type: string,
  height?: number,
};
const ApexChart = (props: Props) => {
  const { options, series, type, height } = props;
  const [showChart, setShowCart] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require,no-undef
      Chart = require('react-apexcharts');
      Chart = Chart.default;
      setShowCart(true);
    }
  }, []);
  return (
    <React.Fragment>
      {showChart && (
        <Chart
          options={options}
          series={series}
          type={type}
          width="100%"
          height={height || 250}
        />
      )}
    </React.Fragment>
  );
};

export default ApexChart;
