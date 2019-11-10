const redis = require('redis');

let client = {};

async function connect() {
    client = await redis.createClient(process.env.REDIS_URL);

    console.log('connecting to redis...');
    client.on('error', (err) => {
        console.error(err);
    });
    await new Promise((resolve) => {
        client.on('ready', () => {
            console.log('connected to redis');
            resolve();
        });
    });

    return client;
}

function waitForConnection() {
    return new Promise((resolve) => {
        if (client.ready === true) {
            resolve(client);
        } else {
            connect()
                . then((r) => resolve(r));
        }
    });
}


module.exports = {
    connect,
    waitForConnection,
    client,
};