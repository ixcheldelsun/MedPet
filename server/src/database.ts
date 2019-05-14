import mysql from 'promise-mysql';

import keys from './keys'

const pool = mysql.createPool(keys.database); //se crea la conexión con la BD a partir de los datos de acceso(keys)

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB is connected')

    });

export default pool;