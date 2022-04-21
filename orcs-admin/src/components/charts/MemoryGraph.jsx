import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

const MemoryGraph = ({ socket }) => {
  const [series, setSeries] = useState([
    {
      name: "Memory Usage",
      data: [],
    },
  ]);
  const url = useLocation().search;
  const paramValue = new URLSearchParams(url).get("macA") || "";

  const options = {
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
      text: "Free CPU [%] ",
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
    const getDataListener = (data) => {
      let tempMacA = Object.keys(data)[0];
      if (tempMacA === paramValue) {
        updateData(data[tempMacA]["mem"]["active"]);
      }
    };
    socket.on("data", getDataListener);
  }, [socket]);

  const updateData = (y) => {
    const x = Math.floor(new Date().getTime() / 1000);
    let { data } = series[0];
    data.push({ x, y });
    if (data.length > 20) {
      data = data.slice(data.length - 10, data.length);
    }
    setSeries([{ ...series[0], data: data }]);
    ApexCharts.exec("memgraph", "updateSeries", [{ ...series[0], data: data }]);
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
