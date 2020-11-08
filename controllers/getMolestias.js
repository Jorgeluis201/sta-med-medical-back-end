const getInfoPaciente = async () => {

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');
    const QUERY_GET_USUARIO = `SELECT pers.rut, mol.fecha, cr.abreviatura
                                FROM personas pers 
                                JOIN molestias mol
                                on(id_persona = personas_id_persona)
                                JOIN enfermedades enf
                                on(enf.id_enfermedad = mol.enfermedades_id_enfermedad)
                                JOIN condicion_cr cr
                                ON (id_condicion = enf.condicion_cr_id_condicion)
                                WHERE ROLES_ID_ROL = :roles_id_rolbv`;

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
            obj.fecha = row[1];
            obj.texto = row[2];
            obj.abreviatura = row[3];
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