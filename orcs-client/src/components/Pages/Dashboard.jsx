import React from "react";
import { Container, Row } from "shards-react";
import { TailSpin } from "react-loader-spinner";

import {
  Icon01,
  Icon02,
  Icon03,
  Icon04,
  Icon05,
  Icon06,
  Icon07,
  Icon08,
  Icon09,
} from "../../assets/images/SearchJobsIcon";
import SingleMachine from "../utilities/single-machine-card";
import socket from "../../socket/socketInit";

const Dashboard = (perfData) => {
  const MachineData = [
    {
      subTitle: "Maximoz Team",
      title: "Database Progammer",
      icon: Icon01,
      lowRate: "14,000",
      highRate: "25,000",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      locationPlace: "London",
      locationCountry: "England",
    },
    {
      subTitle: "Colo Colo Studios",
      title: "Intern Programmer",
      icon: Icon02,
      lowRate: "14,000",
      highRate: "25,000",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      locationPlace: "London",
      locationCountry: "England",
    },
    {
      subTitle: "Kleanify Ltd.",
      title: "PHP Programmer",
      icon: Icon03,
      lowRate: "14,000",
      highRate: "25,000",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      locationPlace: "London",
      locationCountry: "England",
    },
    {
      subTitle: "Kitakita Crew Ltd.",
      title: "Frontend Programmer",
      icon: Icon04,
      lowRate: "14,000",
      highRate: "25,000",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      locationPlace: "London",
      locationCountry: "England",
    },
    {
      subTitle: "Madju Djaja Studios",
      title: "Backend Programmer",
      icon: Icon05,
      lowRate: "14,000",
      highRate: "25,000",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      locationPlace: "London",
      locationCountry: "England",
    },
    {
      subTitle: "Junaids Team",
      title: "Full-Stack Programmer",
      icon: Icon06,
      lowRate: "14,000",
      highRate: "25,000",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      locationPlace: "London",
      locationCountry: "England",
    },
    {
      subTitle: "Maximoz Team",
      title: "Intern Programmer",
      icon: Icon07,
      lowRate: "14,000",
      highRate: "25,000",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      locationPlace: "London",
      locationCountry: "England",
    },
    {
      subTitle: "Maximoz Team",
      title: "Database Progammer",
      icon: Icon08,
      lowRate: "14,000",
      highRate: "25,000",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      locationPlace: "London",
      locationCountry: "England",
    },
    {
      subTitle: "Maximoz Team",
      title: "Frontend Programmer",
      icon: Icon09,
      lowRate: "14,000",
      highRate: "25,000",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      locationPlace: "London",
      locationCountry: "England",
    },
  ];

  //   componentDidMount() {
  //     this._fetchData = true;

  //     if (this._fetchData) {
  //       socket.on("data", (data) => {
  //         var currentState = { ...this.state.perfData };
  //         currentState[data.macA] = data;
  //         this.setState({
  //           perfData: currentState,
  //         });
  //       });
  //     }
  //   }

  //   componentWillUnmount() {
  //     this._fetchData = false;
  //   }

  //   render() {
  //     const {
  //       isActive,
  //       osType,
  //       systemInformation,
  //       cpu,
  //       cpuTemp,
  //       mem,
  //       networkInterfaces,
  //     } = this.state.perfData;

  //   if (!isActive) {
  //     return (
  //       <div
  //         style={{
  //           textAlign: "center",
  //           justifyContent: "center",
  //           display: "flex",
  //         }}
  //       >
  //         <TailSpin
  //           height="70"
  //           width="100"
  //           color="#2596be"
  //           arialLabel="loading"
  //         />
  //       </div>
  //     );
  //   }

  //   if (!osType) {
  //     return (
  //       <div
  //         style={{ backgroundColor: "rgb(255, 250, 250)" }}
  //         className="jumbotron card jumbotron-fluid"
  //       >
  //         <h2 className="card-title">System Offline...</h2>
  //         <p className="card-text">Oops! Lost connection to the system. 🚫</p>
  //       </div>
  //     );
  //   }
  // console.log(this.props.sysInfo);
  return (
    <Container fluid className="main-content-container px-4">
      <Row>
        {(MachineData || []).map((machine, i) => (
          <SingleMachine MachineData={machine} key={i}></SingleMachine>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
