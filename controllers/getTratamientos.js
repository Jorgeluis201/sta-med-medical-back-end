const getInfoPaciente = async () => {

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');
    const QUERY_GET_USUARIO = `SELECT pers.rut ,count(pers.id_persona), med.nombre_breve , trunc(rec.dosis_indic/30, 2) ||' c/'|| rec.fraccion_indic||' hrs' as "DOSIS_DIARIA",
                                cr.abreviatura, info.respuesta
                                FROM medicamentos med
                                JOIN recetados rec 
                                ON(med.id_medicamento = rec.medicamentos_id_medicamento)
                                JOIN personas pers
                                ON(pers.id_persona = rec.personas_id_persona)
                                JOIN usos us
                                ON(us.medicamentos_id_medicamento = med.id_medicamento)
                                JOIN enfermedades enf
                                ON(us.enfermedades_id_enfermedad = enf.id_enfermedad)
                                JOIN condicion_cr cr 
                                ON(cr.id_condicion = enf.condicion_cr_id_condicion)
                                JOIN informe_consumos info
                                ON (info.id_consumo = rec.informe_consumos_id_consumo)
                                WHERE ROLES_ID_ROL = :roles_id_rolbv
                                group by pers.rut, med.nombre_breve, rec.dosis_indic, rec.fraccion_indic, cr.abreviatura, info.respuesta`;

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
            obj.nombre_breve = row[2];
            obj.dosis_diaria = row[3];
            obj.con_cronica = row[4];
            obj.consumo_medicamento = row[5];
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