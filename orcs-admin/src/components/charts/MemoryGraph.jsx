import React, { useState, useEffect, memo } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

const MemoryGraph = ({ memData }) => {
  const [series, setSeries] = useState([
    {
      name: "Memory Usage",
      data: [],
    },
  ]);

  const options = {
    Cache: true,
    chart: {
      id: "memgraph",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Active Memory Usage [GB] ",
      align: "left",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      range: 10,
    },
    legend: {
      show: false,
    },
  };

  useEffect(() => {
    let mem = memData?.active;
    let memInMB = Math.floor((mem / 1073741824) * 100) / 100;
    updateData(memInMB);
  }, [memData]);

  const updateData = (y) => {
    const x = Math.floor(new Date().getTime() / 1000);
    let { data } = series[0];
    data.push({ x, y });
    // if (data.length > 20) {
    //   data = data.slice(data.length - 10, data.length);
    // }
    setSeries([{ ...series[0], data: data }]);
    ApexCharts.exec("memgraph", "updateSeries", [{ data }]);
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="300"
    />
  );
};

export default MemoryGraph;
