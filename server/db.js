const Client = require('pg').Client;

const client = new Client({
    host: 'localhost',
    port: '5433',
    database: 'Prisme',
    user: 'postgres',
   // password: ''
});

(async () => {
    await client.connect()
})();

module.exports = client;
