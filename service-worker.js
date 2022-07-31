self.onactivate = (event) => event.waitUntil(self.clients.claim());

self.onfetch = (event) => {
    if  (!event.request.url.endsWith('/data.json')) {
        return event.respondWith(fetch(event.request));
    }

    event.respondWith(
        new Response(
            JSON.stringify(
                [
                    {
                        param1: 'value1',
                        param2: 'value2',
                        param3: 'value3',
                        param4: 'value4',
                    },
                    {
                        param1: 'value1',
                        param2: 'value2',
                        param3: 'value3',
                        param4: 'value4',
                    },
                    {
                        param1: 'value1',
                        param2: 'value2',
                        param3: 'value3',
                        param4: 'value4',
                    },
                    {
                        param1: 'value1',
                        param2: 'value2',
                        param3: 'value3',
                        param4: 'value4',
                    },
                ]
            )
        )
    );
}
