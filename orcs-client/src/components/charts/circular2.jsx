import React from "react";
import ReactApexChart from "react-apexcharts";

const Circular2 = () => {
  const options = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: "45%",
        },
        dataLabels: {
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["rgb(2, 164, 153)"],
    labels: [""],
  };
  const series = [60];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height="300"
    />
  );
};

export default Circular2;
