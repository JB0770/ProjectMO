const { Client } = require('pg');

// Configuración de la conexión a PostgreSQL
const client = new Client({
    user: 'jorda',
    host: 'postgresql-jorda.alwaysdata.net',
    database: 'jorda_dbaoportunidades',
    password: 'LuzMar071',
    port: 5432, // El puerto por defecto de PostgreSQL es 5432
});

client.connect()
    .then(() => console.log('Conexión exitosa a PostgreSQL'))
    .catch(err => console.error('Error al conectar a PostgreSQL', err))
    

module.exports =client;

