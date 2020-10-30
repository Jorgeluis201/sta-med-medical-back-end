const { response } = require('express');

const getUsuario = async () => {

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');
    const QUERY_GET_USUARIO = `select id_persona, usuario, hash_clave from personas
                                where roles_id_rol = :roles_id_rolbv`;

    //bv significa el valor que espera como parametro. En este caso id.

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            QUERY_GET_USUARIO,
            [1],
            {
                maxRows: 6
            });

        const data = result.rows.map(row => {

            const obj = new Object();
            obj.id = row[0];
            obj.usuario = row[1];
            obj.hash_clave = row[2];

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