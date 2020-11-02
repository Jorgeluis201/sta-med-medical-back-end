const { response } = require('express');
const { OUT_FORMAT_OBJECT } = require('oracledb');

const getInfoPaciente = async () => {

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');
    const QUERY_GET_USUARIO = `Select PERS.RUT,PERS.nombres || ' ' || PERS.APELLIDO_PAT || ' ' | | PERS.APELLIDO_MAT "NOMBRE COMPLETO",
                                    EXTRACT(YEAR FROM SYSDATE) - EXTRACT(YEAR FROM PERS.FECHA_NAC)"EDAD",
                                    PAR.PESO,PAR.ESTATURA,PAR.EJERCICIO,PAR.FUMA,PAR.PA_SIST,
                                    SUBSTR((PAR.PESO/(PAR.ESTATURA*PAR.ESTATURA)),1,4)"IMC"
                                FROM PERSONAS PERS 
                                JOIN PARAMETROS PAR
                                ON(PERS.ID_PERSONA = PAR.PERSONAS_ID_PERSONA)
                                WHERE ROLES_ID_ROL = :roles_id_rolbv
                                ORDER BY ID_PERSONA`;

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
            obj.nombre = row[1];
            obj.edad = row[2];
            obj.peso = row[3];
            obj.estatura = row[4];
            obj.ejercicio = row[5];
            obj.fumador = row[6];
            obj.IMC = row[7]


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

module.exports = getInfoPaciente();