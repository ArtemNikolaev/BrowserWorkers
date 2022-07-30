self.onmessage = (msg) => {
    const rfcMessage = msg.data;

    postMessage({
        jsonrpc: 2.0,
        result: `${rfcMessage.method} ${rfcMessage.params.join(' ')}`,
        id: rfcMessage.id,
    });
};
