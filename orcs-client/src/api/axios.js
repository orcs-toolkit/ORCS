import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:4001/auth',
	headers: {
		'Content-Type': 'application/json',
		'Allow-Origin-With-Credentials': '*',
		'Access-Control-Allow-Origin': '*',
	},
	withCredentials: true,
});
