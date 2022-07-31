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
