const getUsuario = async () => {

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');

    const QUERY_GET_USUARIO = `SELECT RUT,nombres || ' ' || APELLIDO_PAT || ' ' || Apellido_mat  , usuario, hash_clave,email
                                FROM PERSONAS
                                WHERE ROLES_ID_ROL = :roles_id_rolbv `;

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            QUERY_GET_USUARIO,
            [2],
            {
                maxRows: 0
            });

        const data = result.rows.map(row => {

            const obj = new Object();
            obj.rut = row[0];
            obj.nombre = row[1];
            obj.usuario = row[2];
            obj.hash_clave = row[3];
            obj.email = row[4];

            return obj;
        })

        const js = JSON.stringify(data);
        return js;

    } catch (err) {
        
        console.error(err);

    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = getUsuario();
