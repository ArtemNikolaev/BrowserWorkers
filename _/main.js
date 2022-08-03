const jsonrpc = 2.0;

/* Web Worker */
const webWorker = new Worker('_/web-worker.js', {name: 'Web Worker'});
webWorker.onmessage = (msg) => {
    const response = msg.data;
    document.querySelector('.web-worker-answer').textContent = response.result;
}
function postToWebWorker(form) {
    const formData = new FormData(form);
    const params = formData.getAll('param')

    webWorker.postMessage({
        jsonrpc,
        params,
        method: 'Hello',
        id: crypto.randomUUID(),
    })
}

/* Shared Worker */
const sharedWorker = new SharedWorker('_/shared-worker.js', {name: 'Shared Worker'});
sharedWorker.port.onmessage = (msg) => {
    const response = msg.data;
    const p = document.createElement('p');
    p.textContent = response.result;
    document.querySelector('.shared-worker-answer').append(p);
}
function postToSharedWorker(form) {
    const formData = new FormData(form);
    const params = formData.getAll('param')

    sharedWorker.port.postMessage({
        jsonrpc,
        method: 'Send',
        params,
        id: crypto.randomUUID(),
    })
}

/* Service Worker */
navigator.serviceWorker.register('/service-worker.js', { scope: '/' }).catch(console.log)
async function makeRequest() {
    const result = await fetch('/API/data.json');
    const payload = await result.json();
    document.querySelector('.service-worker-answer').textContent = JSON.stringify(payload, null, 4);
}

/* Web Worker RPC Command Dispatcher */
const worker = new RPCWorker('_/commandsDispatcher.js');

Promise.allSettled([
    worker.exec('bla', 'bla bla bla'),
    worker.exec('bla1', 'bla bla bla'),
    worker.exec('bla2', 'bla bla bla'),
    worker.exec('bad'),
]).then(console.log);
