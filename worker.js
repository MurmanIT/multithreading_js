const { parentPort } = require("worker_threads");

parentPort.on("message", (message) => {
    console.log('We got a message', message);
})
parentPort.postMessage('Hello from worker');