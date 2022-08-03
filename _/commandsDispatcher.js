const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

function asyncOnMessageWrap(fn) {
    return async function(msg) {
         postMessage(await fn(msg.data));
    }
}

const commands = {
    async bla(msg) {
        await sleep(Math.random() * 100);
        return 'bla ' + msg;
    },
    async bla1(msg) {
        await sleep(Math.random() * 100);
        return 'bla1 ' + msg;
    },
    async bad(msg) {
        await sleep(Math.random() * 100);
        throw new Error('oh no!');
    }
};

self.onmessage = asyncOnMessageWrap( async(rpc) => {
    const { method, params, id } = rpc;

    if (!commands.hasOwnProperty(method)) {
        return {
            id, error: {
                code: -32601,
                message: `method ${method} not found`
            }
        }
    }

    try {
        const result = await commands[method](...params);
        return {id, result};
    } catch (err) {
        return { id, error: { code: -32000, message: err.message}}
    }
})