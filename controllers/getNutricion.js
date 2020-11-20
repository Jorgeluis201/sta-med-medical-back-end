const getNutricion = async () => {

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');
    const QUERY_GET_USUARIO = `select c.abreviatura, p.nombre, p.puntaje_nada, p.puntaje_leve, p.puntaje_mod, p.puntaje_grave
                                from preguntas p join condicion_cr c
                                on (p.condicion_cr_id_condicion = c.id_condicion)
                                where p.nutri_o_sintom = :nutri_o_sintombv`;

    //bv significa el valor que espera como parametro. En este caso id.

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            QUERY_GET_USUARIO,
            ['nutri'],
            {
                maxRows: 0
            });

        const data = result.rows.map(row => {

            const obj = new Object();
            obj.abreviatura = row[0];
            obj.nombre = row[1];
            obj.puntaje_nada = row[2];
            obj.puntaje_leve = row[3];
            obj.puntaje_mod = row[4];
            obj.puntaje_grave = row[5];
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

module.exports = getNutricion();