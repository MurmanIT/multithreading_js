const { isMainThread, Worker } = require("worker_threads");

if (isMainThread) {
    const worker = new Worker('./worker.js');
    worker.on('message', (message) => {
        console.log(message);
        worker.postMessage(message); // echo
    });
}