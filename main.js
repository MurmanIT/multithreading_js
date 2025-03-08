console.log("Hello, World! main.js");

const worker = new Worker("worker.js");

worker.onmessage = (msg) => {
    console.log('message from worker.js: ', msg.data);
}

worker.postMessage([1,2,3,4,5,6,7,8,9,10]);
console.log("End main.js");