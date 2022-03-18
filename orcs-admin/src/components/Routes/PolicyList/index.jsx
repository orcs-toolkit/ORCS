import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
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
import BanlistButton from "./BanlistButton";

const BanList = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchData = () => {
    setloading(true);
    axios
      .get("http://localhost:4001/api/getRoleWisePolicy")
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
  }, []);

  return loading ? (
    <FullScreenLoader />
  ) : (
    <Fragment>
      <Container fluid className="main-content-container px-4">
        <Row>
          <Col lg={6}>
            <div
              className="d-flex text-center py-2 my-2"
              style={{ justifyContent: "space-between" }}
            >
              <h4 className="fs-22 font-w600">Defined Policies</h4>
              <BanlistButton onReload={fetchData} />
            </div>
          </Col>
          <Col lg={6}></Col>
          <Col lg={6}>
            <Row>
              {data.map((d) => (
                <Col lg={6}>
                  <Card className="border border-primary rounded card shadow_1">
                    <Card.Title className="m-4 d-flex justify-content-between">
                      {d._id}
                      <BanlistButton
                        edit={true}
                        role={d._id}
                        onReload={fetchData}
                        banList={d.list[0]}
                      />
                    </Card.Title>
                    <ListGroup
                      className="list-group-flush overflow-auto"
                      style={{ maxHeight: 200 }}
                    >
                      {d.list[0].map((p, i) => {
                        return (
                          <ListGroupItem>
                            <h5>{p}</h5>
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col lg={6}></Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BanList;
