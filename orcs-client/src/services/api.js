import axios from 'axios';

export default axios.create({
	baseURL: 'http://192.168.56.10:4001/',
});
