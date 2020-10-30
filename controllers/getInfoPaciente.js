const { response } = require('express');

const getInfoPaciente = async () => {

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');
    const QUERY_GET_USUARIO = `select p.id_persona, p.rut, p.nombres || ' ' || p.apellido_pat || ' ' || p.apellido_mat as NOMBRE_PACIENTE, 
                                    extract(year from sysdate) - extract(year from p.fecha_nac) as EDAD, 
                                    E.ID_ENFERMEDAD, E.ENFERMEDAD, PAR.FUMA, 
                                    PAR.EJERCICIO
                                    from personas P JOIN MOLESTIAS M 
                                    ON (P.ID_PERSONA = M.PERSONAS_ID_PERSONA)
                                    JOIN ENFERMEDADES E 
                                    ON (E.ID_ENFERMEDAD = M.ENFERMEDADES_ID_ENFERMEDAD)
                                    JOIN PARAMETROS PAR 
                                    ON (P.ID_PERSONA = PAR.PERSONAS_ID_PERSONA)
                                where roles_id_rol = :roles_id_rolbv`;

    //bv significa el valor que espera como parametro. En este caso id.

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            QUERY_GET_USUARIO,
            [3],
            {
                maxRows: 6
            });

        const data = result.rows.map(row => {

            const obj = new Object();
            obj.id = row[0];
            obj.rut = row[1];
            obj.nombre = row[2];
            obj.edad = row[3];
            obj.id_enfermedad = row[4];
            obj.nombre_enfermedad = row[5];
            obj.fumador = row[6];
            obj.ejercicio = row[7];

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