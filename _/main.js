const jsonrpc = 2.0;

/* Web Worker*/
const webWorker = new Worker('_/web-worker.js');
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
