import React from "react";
import ReactApexChart from "react-apexcharts";

const Circular2 = ({ dataLabel, dataValue }) => {
  const options = {
    plotOptions: {
      radialBar: {
        offsetY: -20,
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "45%",
        },
        dataLabels: {
          value: {
            show: true,
            offsetY: 10,
            fontSize: "22px",
          },
        },
      },
    },
    colors: ["rgb(2, 164, 153)"],
    labels: [dataLabel],
  };
  const series = [dataValue];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height="200"
    />
  );
};

export default Circular2;
