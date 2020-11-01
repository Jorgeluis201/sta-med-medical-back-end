const { response } = require('express');

const getEnfermedadPaciente = async () => {

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');


    const QUERY_GET_USUARIO = `SELECT PERS.RUT,
                                      COUNT(ENF.NOMBRE)"CANT ENFERMEDADES",
                                      CO.ABREVIATURA
                                FROM PERSONAS PERS 
                                JOIN MOLESTIAS MO
                                ON(MO.PERSONAS_ID_PERSONA = PERS.ID_PERSONA)
                                JOIN ENFERMEDADES ENF
                                ON(ENF.ID_ENFERMEDAD = MO.ENFERMEDADES_ID_ENFERMEDAD)
                                JOIN CONDICION_CR CO
                                ON(CO.ID_CONDICION = ENF.CONDICION_CR_ID_CONDICION)
                                WHERE ROLES_ID_ROL = :roles_id_rolbv
                                GROUP BY CO.ABREVIATURA,PERS.RUT 
                                ORDER BY PERS.RUT`;


    //bv significa el valor que espera como parametro. En este caso id.

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            QUERY_GET_USUARIO,
            [1],
            {
                maxRows: 0
            });

        const data = result.rows.map(row => {

            const obj = new Object();
            obj.rut = row[0];
            obj.con_cronica = row[2];
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

module.exports = getEnfermedadPaciente();