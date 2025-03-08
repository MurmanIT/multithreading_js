console.log('Mult.js');

const worker = new SharedWorker("shared.js");

worker.port.onmessage = (event) => {
    console.log('message from shared.js: ', event.data);
}

const operation = {
    data: [1,2,3,4,5],
    operation: '*'
}

worker.port.postMessage(operation);

window.addEventListener('beforeunload', () => {
    worker.port.postMessage('close');
});

