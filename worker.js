const { workerData } = require('worker_threads');
const { port } = workerData;
port.on('message', (message) => {
    console.log('We got a message', message);    
})
port.postMessage('Hello from worker');