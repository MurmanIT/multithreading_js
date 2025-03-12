const assert = require('assert');
const { isMainThread, Worker, workerData } = require('worker_threads');

if (isMainThread) {
    const worker = new Worker(__filename, { workerData: { 
        a: 1,
        b: 'test',
    }})
} else {
    const { a, b } = workerData;
    console.log(workerData);
    assert.strictEqual(a, 1);
    assert.strictEqual(b, 'test');
}