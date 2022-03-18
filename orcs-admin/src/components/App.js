import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'shards-react';

import '../css/style.css';
import Header from './Header';
import Dashboard from './Pages/Dashboard';
import MachineDetails from './Pages/MachineDetails';
import Login from './auth/Login';
import socket from '../socket/socketInit';

class App extends React.Component {
	componentDidMount() {
		socket.on('logs', (data) => {
			window.api.send('toMain', data);
		});
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Header />
					<br />
					<Container fluid className="main-content-container px-4">
						<Switch>
							<Route path="/process">
								<MachineDetails />
							</Route>
							<Route path="/login">
								<Login />
							</Route>
							<Route exact path="/">
								<Dashboard />
							</Route>
						</Switch>
					</Container>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
