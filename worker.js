console.log("Hello, World from worker.js");

self.onmessage = (msg) => {
    console.log('message from main.js: ', msg.data);
    let list = msg.data || [];
    self.postMessage(list.reduce((a, b) => a + b, 0));
}