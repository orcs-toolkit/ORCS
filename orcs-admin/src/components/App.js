import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "shards-react";

import "../css/style.css";
import Header from "./Header";
import Dashboard from "./Routes/Dashboard";
import MachineDetails from "./Routes/MachineDetails";
import BanList from "./Routes/PolicyList";
import Login from "./auth/Login";
import io from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let newSocket = io.connect("http://localhost:4000");
    newSocket.emit("clientAuth", "admin");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket !== null) {
      socket.on("logs", (data) => {
        window.api.send("toMain", data);
      });
    }
  }, [socket]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <br />
        <Container fluid className="main-content-container px-4">
          {socket && (
            <Switch>
              <Route path="/process">
                <MachineDetails socket={socket} />
              </Route>
              <Route path="/banList">
                <BanList />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Dashboard socket={socket} />
              </Route>
            </Switch>
          )}
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
