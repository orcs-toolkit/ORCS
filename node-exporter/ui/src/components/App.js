import { Route, Switch, HashRouter } from 'react-router-dom';
import history from '../history';
import Home from './Home';
import Login from './Login';
import Register from './Register';

function App() {
	return (
		<div>
			<HashRouter history={history}>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
				</Switch>
			</HashRouter>
		</div>
	);
}

export default App;
