console.log('Shared.js');
const UUID = generateUUID();
console.log('Shared->', UUID);

const ports = new Set();

self.onconnect = (event) => {
    const port = event.ports[0];
    ports.add(port);
    console.log('port connected', port, UUID);
    port.onmessage = (event) => {
        console.log('MESSAGE', UUID, event.data);

        for (const port of ports) {
            const data = event.data;
            if (data?.operation === '*') {
                port.postMessage([UUID, data?.data.reduce((a, b) => a * b, 1)]);
            }
            if (data?.operation === '+') {
                port.postMessage([UUID, data?.data.reduce((a, b) => a + b, 0)]);
            }
        }
    }
}




function generateUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}