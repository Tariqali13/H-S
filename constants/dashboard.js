export const lineChartOptions = labels => ({
  chart: {
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  xaxis: {
    categories: labels,
    type: 'datetime',
    labels: {
      format: 'MMM dd',
      rotate: 0,
      rotateAlways: false,
    },
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy',
    },
  },
  yaxis: {
    show: true,
    labels: {
      formatter(value) {
        return value.toFixed(0);
      },
    },
  },
  colors: ['#175cff'],
  fill: {
    type: 'gradient',
    color: '#175cff',
    gradient: {
      colorFrom: '#175cff',
      opacityFrom: 0.5,
      opacityTo: 0.1,
    },
  },
  dropShadow: {
    enabled: true,
    top: 0,
    left: 0,
    blur: 1,
    opacity: 0.4,
  },
  dataLabels: {
    enabled: false,
  },
});
