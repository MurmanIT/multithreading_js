const crypto = require('crypto');
const {
    Worker,
    isMainThread,
    parentPort,
} = require('worker_threads');

const big64arr = new BigUint64Array(1);

function random64() {
    crypto.randomFillSync(big64arr);
    return big64arr[0];
}

function sumDigitsSquared(num) {
    let total = 0n;
    while (num > 0n) {
        const numModBase = num % 10n;
        total += numModBase ** 2n;
        num /= 10n;
    }
    return total;
}

function isHappy(num) {
    while (num != 1n && num != 4n) {
        num = sumDigitsSquared(num);
    }
    return num === 1n;
}

function isHappycoin(num) {
    return isHappy(num) && num % 10000n === 0n;
}

const THREAD_COUNT = 4;

if (isMainThread) {
    let inFlight = THREAD_COUNT;
    let count = 0;
    for  (let i = 0; i < THREAD_COUNT; i++) {
        const worker = new Worker(__filename);
        worker.on('message', (message) => {
            if (message === 'done') { 
                if (--inFlight === 0) {
                    process.stdout.write(`\n${count}`);
                }
            } else if (typeof message === 'bigint') {
                process.stdout.write(`${message.toString()}\n`);
                count++;
            }
        });
    }
} else {
    for (let i = 1; i < 10_000_000/THREAD_COUNT; i++) {
        const randomNum = random64();
        if (isHappycoin(randomNum)) {
            parentPort.postMessage(randomNum);
        }
    }
    parentPort.postMessage('done');
}