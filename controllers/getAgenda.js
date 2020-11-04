const getAgenda = async () => {
    
    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');

    

    const QUERY_GET_AGENDA = `SELECT CI.MEDICORUT,PERS.RUT,PERS.NOMBRES,TO_DATE(CI.FECHA_ASIGNADA||CI.HORA_ASIGNADA,'DD/MM/YYYY/HH24:MI:SS') "Start"
                                FROM PERSONAS PERS
                                JOIN CITAS CI
                                ON(PERS.ID_PERSONA = CI.PERSONAS_ID_PERSONA)
                                WHERE PERS.ROLES_ID_ROL= :roles_id_rolbv `;

    //bv significa el valor que espera como parametro. En este caso id.

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            QUERY_GET_AGENDA,
            [1],
            {
                maxRows: 0
            });

        const data = result.rows.map(row => {

            const obj = new Object();
            obj.medicoRut = row[0];
            obj.rut = row[1];
            obj.nombre = row[2];
            obj.start = row[3];

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

module.exports = getAgenda();