import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
//import Circular2 from "../charts/circular2";
import ProcessList from "./ProcessList";
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
import StyledCard from "../utilities/StyledCard";

const MachineDetails = ({ socket }) => {
  var icons = [
    Icon01,
    Icon03,
    Icon05,
    Icon06,
    Icon07,
    Icon02,
    Icon08,
    Icon09,
    Icon04,
  ];
  const url = useLocation().search;
  const paramValue = new URLSearchParams(url).get("macA") || "";
  const [machineData, setMachineData] = useState(undefined);
  const [defaultIcon, setdefaultIcon] = useState(Icon01);

  const formatBytes = (size) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (size == 0) return "0 Bytes";
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return parseFloat((size / Math.pow(1024, i)).toFixed(1)) + " " + sizes[i];
  };

  useEffect(() => {
    setdefaultIcon(icons[Math.floor(Math.random() * icons.length)]);
  }, []);

  useEffect(() => {
    const getDataListener = (data) => {
      let tempMacA = Object.keys(data)[0];
      tempMacA === paramValue && setMachineData(data[tempMacA]);
    };
    socket.on("data", getDataListener);
  }, [socket]);

  return (
    <Fragment>
      {machineData ? (
        <div className="row">
          <div className="row col-6">
            <div className="col-12">
              <div className="card flex-lg-column flex-md-row">
                <div className="py-4 px-2 text-center">
                  <div className="row border-bottom p-2">
                    <div className="col-6">
                      <div className="profile-image mb-4 mt-2">
                        {defaultIcon}
                      </div>
                      <h4 className="fs-22 text-black ml-3 mb-1">
                        UserName: {machineData.userName || "NA"}
                      </h4>
                      <h5 className="ml-3 fs-20 py-1">
                        MacA: {machineData.macA}
                      </h5>
                      <h5 className="ml-3 fs-18">Type: {machineData.role}</h5>
                    </div>
                    <div className="col-6 my-4">
                      <div className="row">
                        <div className="col-12">
                          <div className="border rounded m-2">
                            <h4 className="fs-22 text-black font-w600">
                              OS Type
                            </h4>
                            <span className="text-black">
                              {machineData.osType.platform} -{" "}
                              {machineData.osType.distro}
                            </span>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="border rounded m-2">
                            <h4 className="fs-22 text-black font-w600">
                              CPU Model
                            </h4>
                            <span className="text-black">
                              {machineData.cpu.manufacturer +
                                " " +
                                machineData.cpu.brand}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row text-center mx-2">
                    <StyledCard
                      title={"No. of Cores"}
                      borderColor={"primary"}
                      body={machineData.cpu.cores}
                    />
                    <StyledCard
                      title={"CPU Speed"}
                      borderColor={"danger"}
                      body={machineData.cpu.speed + " Ghz" || ""}
                    />
                    <StyledCard
                      title={"Total Memory"}
                      borderColor={"warning"}
                      body={formatBytes(machineData.mem.total)}
                    />
                    <StyledCard
                      title={"Used Memory"}
                      borderColor={"info"}
                      body={formatBytes(machineData.mem.used)}
                    />
                    <StyledCard
                      title={"Free Memory"}
                      borderColor={"secondary"}
                      body={formatBytes(machineData.mem.free)}
                    />
                    <StyledCard
                      title={"Is Active"}
                      borderColor={"success"}
                      body={machineData.isActive ? "Yes" : "No"}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-12">
              <div className="card">
                <div className="card-header align-items-center flex-wrap border-0 pb-0">
                  <h4 className="fs-20 text-black mb-4 mr-3">
                    Resource Utilization
                  </h4>
                </div>
                <div className="card-body pt-0">
                  <div className="d-flex">
                    <span className="mr-4">
                      <svg
                        className="mr-2"
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="19" height="19" rx="9.5" fill="#40189D" />
                      </svg>
                      View Profile
                    </span>
                    <span>
                      <svg
                        className="mr-2"
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="19" height="19" rx="9.5" fill="#3F9AE0" />
                      </svg>
                      Hire
                    </span>
                  </div>
                  <div className="mt-5">
                    <DualLine />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-6">
            <ProcessList socket={socket} />
          </div>
        </div>
      ) : (
        <div
          className="w-100 h-100"
          style={{
            display: "flex",
            marginTop: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" />
        </div>
      )}
    </Fragment>
  );
};

export default MachineDetails;
