const getCompensacion = async () => {
    

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');


    const QUERY_GET_COMPENSACION = `SELECT PERS.RUT,EX.NOMBRE,MED.VALOR
                                    FROM MEDICIONES MED 
                                    JOIN PERSONAS PERS
                                    ON(PERS.ID_PERSONA = MED.PERSONAS_ID_PERSONA)
                                    JOIN EXAMENES EX
                                    ON(EX.ID_EXAMEN=MED.EXAMENES_ID_EXAMEN)
                                    WHERE PERS.ROLES_ID_ROL = :id_rolbv`;

    const QUERY_GET_COMPENSACION2 = `SELECT PERS.RUT, PAR.PA_SIST, PAR. PA_DIAST 
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

        const result2 = await connection.execute(
            QUERY_GET_COMPENSACION2,
            [1],
            {
                maxRows: 0
            }
        );

        const data = result.rows.map(row => {

            const obj = new Object();
            obj.rut = row[0];
            let nombre = "nombre_param";
            obj[nombre] = row[1];
            obj.valor = row[2];
            return obj;
        })

        const data2 = result2.rows.map(row => {

            const obj = new Object();
            obj.rut = row[0];
            const nombre = "nombre_param";
            const nombre2 = "pa_sist"
            obj[nombre] = nombre2;
            obj.valor = row[1];
            return obj;
        })

        const data3 = result2.rows.map(row => {

            const obj = new Object();
            obj.rut = row[0];
            const nombre = "nombre_param";
            const nombre2 = "pa_dist"
            obj[nombre] = nombre2;
            obj.valor = row[2];
            return obj;
        })

        const array3 = data.concat(data2);
        const array4 = array3.concat(data3);

        const js = JSON.stringify(array4);
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

module.exports = getCompensacion();