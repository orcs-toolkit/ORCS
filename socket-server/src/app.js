require('dotenv').config();
const cluster = require('cluster');

const isMaster = require('../src/components/master');
const isWorker = require('../src/components/worker');

if (cluster.isPrimary || !cluster.isWorker) {
	console.log('Hello from Master!');
	isMaster();
} else {
	console.log('Hello from Worker!');
	isWorker();
}
