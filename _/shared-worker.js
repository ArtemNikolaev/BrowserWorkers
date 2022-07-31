const ports = new Set();

self.onconnect = (event) => {
    const port = event.ports[0];
    ports.add(port);

    port.onmessage = (event) => {
        const rfcMessage = event.data;
        for (let p of ports) {
            p.postMessage({
                jsonrpc: 2.0,
                result: `${rfcMessage.params.join(' ')}`,
                id: rfcMessage.id,
            });
        }
    }
}
