const getPreguntas = async () => {

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');
    const QUERY_GET_USUARIO = `SELECT pers.rut as "RUT", MAX(sin.fecha) AS "FECHA_SINTOMA", preg.nombre as "NOMBRE_PREGUNTA", sin.respuesta as "RESPUESTA_SINTOMA", cr.abreviatura
                                FROM personas pers 
                                JOIN sintomas sin
                                ON(sin.personas_id_persona = pers.id_persona)
                                JOIN PREGUNTAS preg
                                ON(preg.id_pregunta = sin.preguntas_id_pregunta)
                                JOIN condicion_cr cr
                                ON(preg.condicion_cr_id_condicion = cr.id_condicion)
                                WHERE PERS.ROLES_ID_ROL= :roles_id_rolbv 
                                GROUP BY pers.rut, sin.fecha, sin.respuesta, preg.nombre, cr.abreviatura`;

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
            obj.fecha_sintoma = row[1];
            obj.nombre_pregunta = row[2];
            obj.respuesta_sintoma = row[3];
            obj.con_cronica = row[4];
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

module.exports = getPreguntas();