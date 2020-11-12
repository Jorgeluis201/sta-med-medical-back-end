const getAvisos = async () => {

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');
    const QUERY_GET_USUARIO = `SELECT pers.rut, dbms_lob.substr( mol.texto, 4000, 1 ) as "MOLESTIA", cr.abreviatura
                                FROM molestias mol
                                JOIN personas pers
                                ON(pers.id_persona = mol.personas_id_persona)
                                JOIN enfermedades enf
                                ON(mol.enfermedades_id_enfermedad = enf.id_enfermedad)
                                JOIN condicion_cr cr
                                ON(cr.id_condicion = enf.condicion_cr_id_condicion)
                                WHERE PERS.ROLES_ID_ROL = :id_rolbv`;

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
            obj.id_molestias = row[0];
            obj.molestia = row[1];
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

module.exports = getAvisos();