const getEnfermedadPaciente = async () => {
    

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');


    const QUERY_GET_USUARIO = `SELECT PERS.RUT,COUNT(PREG.NOMBRE),CR.ABREVIATURA
                               FROM PERSONAS PERS
                               JOIN SINTOMAS SIN
                               ON(SIN.PERSONAS_ID_PERSONA = PERS.ID_PERSONA)
                               JOIN PREGUNTAS PREG
                               ON(PREG.ID_PREGUNTA = SIN.PREGUNTAS_ID_PREGUNTA)
                               JOIN CONDICION_CR CR
                               ON(CR.ID_CONDICION = PREG.CONDICION_CR_ID_CONDICION)
                               WHERE ROLES_ID_ROL = :roles_id_rolbv
                               GROUP BY CR.ABREVIATURA,PERS.RUT`;

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