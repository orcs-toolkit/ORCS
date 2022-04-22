import React, { useState, useEffect, Fragment } from "react";
import api from "../../../utils/api";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Container,
  Col,
  Button,
} from "react-bootstrap";
import FullScreenLoader from "../../utilities/Spinner";
import moment from "moment";

const LogsList = () => {
  const [data, setdata] = useState([]);
  const [limit, setlimit] = useState(20);
  const [loading, setloading] = useState(false);

  const fetchData = () => {
    setloading(true);
    api
      .get("http://localhost:4001/logs?limit=" + limit)
      .then((res) => {
        setdata(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  return loading ? (
    <FullScreenLoader />
  ) : (
    <Fragment>
      <Container
        fluid
        className="main-content-container px-4"
        style={{ background: "#F7F8FB" }}
      >
        <h3 className="text-gray py-3 border-bottom font-w600">Logs</h3>
        <Row>
          <Col lg={3}>
            <h4 className="fs-22 text-gray border-bottom font-w600">Date</h4>
          </Col>
          <Col lg={3}>
            <h4 className="fs-22 text-gray border-bottom font-w600">Label</h4>
          </Col>

          <Col lg={3}>
            <h4 className="fs-22 text-gray border-bottom font-w600">Message</h4>
          </Col>

          <Col lg={3}>
            <h4 className="fs-22 text-gray border-bottom font-w600">Data</h4>
          </Col>
        </Row>
        <Row className="overflow-auto" style={{ maxHeight: 550 }}>
          {data.map((d) => (
            <h4 className="py-2">{`-> ${moment(d.timestamp).format("lll")} - ${
              d.label
            } - ${d.message} - ${d.meta?.data}`}</h4>
          ))}
        </Row>
        <div className="text-center">
          <Button
            className="btn-link bg-transparent py-2 mb-2"
            onClick={() => {
              setlimit(limit + 20);
            }}
          >
            Load More
          </Button>
        </div>
      </Container>
    </Fragment>
  );
};

export default LogsList;
