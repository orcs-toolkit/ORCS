import axios from 'axios';

const baseURL = 'http://192.168.56.10:4001';

const api = axios.create({
	baseURL,
});

export default api;
