import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'shards-react';

import '../css/style.css';
import Header from './Header';
import Dashboard from './Routes/Dashboard';
import MachineDetails from './Routes/MachineDetails';
import BanList from './Routes/PolicyList';
import UserList from './Routes/UserList';
import Login from './Routes/Login';
import PrivateRoute from './PrivateRoute';
import io from 'socket.io-client';

const App = () => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		let newSocket = io.connect('http://localhost:4000');
		newSocket.emit(
			'clientAuth',
			'eyJpZCI6IjYyNTg0NGExODY4NjVlMzNkMzVhZGE2NiIsImVtYWlsIjoiY2h1eGlAb3Jjcy5jb20iLCJuYW1lIj'
		);
		console.log('Newsocket', newSocket);
		setSocket(newSocket);
	}, []);

	useEffect(() => {
		if (socket !== null) {
			socket.on('logs', (data) => {
				window.api.send('toMain', data);
			});
		}
	}, [socket]);

	return (
		<div>
			<BrowserRouter>
				<Header />
				<br />
				<Container fluid className="main-content-container px-4 h-100">
					{socket && (
						<Switch>
							<PrivateRoute exact path="/process">
								<MachineDetails socket={socket} />
							</PrivateRoute>
							<PrivateRoute exact path="/banList">
								<BanList socket={socket} />
							</PrivateRoute>
							<PrivateRoute exact path="/userList">
								<UserList />
							</PrivateRoute>
							<PrivateRoute exact path="/">
								<Dashboard socket={socket} />
							</PrivateRoute>
							<Route path="/login">
								<Login />
							</Route>
							<Route path="/logout">
								<Login />
							</Route>
						</Switch>
					)}
				</Container>
			</BrowserRouter>
		</div>
	);
};

export default App;
