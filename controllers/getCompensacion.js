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
            obj.nombre_param = row[1];
            obj.valor = row[2];
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

module.exports = getCompensacion();