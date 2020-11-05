const getParametros = async () => {
    

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');

    const QUERY_GET_COMPENSACION = `SELECT PERS.RUT, PAR.PA_SIST, PAR. PA_DIAST 
                                    FROM PARAMETROS PAR
                                    JOIN PERSONAS PERS
                                    ON (PERS.ID_PERSONA = PAR.PERSONAS_ID_PERSONA)
                                    WHERE PERS.ROLES_ID_ROL = :id_rolbv`;


    //bv significa el valor que espera como parametro. En este caso id.

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            QUERY_GET_COMPENSACION,
            [1],
            {
                maxRows: 0
            }
        );

        const data = result.rows.map(row => {

            const obj = new Object();
            obj.rut = row[0];
            const nombre = "pa_sist";
            obj.nombre_param = nombre;
            obj.valor = row[1];
            return obj;
        })

        const data2 = result.rows.map(row => {

            const obj = new Object();
            obj.rut = row[0];
            const nombre = "pa_diast";
            obj.nombre_param = nombre;
            obj.valor = row[2];
            return obj;
        })

        const array3 = data.concat(data2);

        const js = JSON.stringify(array3);
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

module.exports = getParametros();