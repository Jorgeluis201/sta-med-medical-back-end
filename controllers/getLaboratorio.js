const getLaboratorio = async () => {
    

    const oracledb = require('oracledb');
    const dbConfig = require('../database/dbconfig');


    const QUERY_GET_USUARIO = `SELECT CR.ABREVIATURA,EVA.HOMBRE,EVA.MUJER,EVA.NIVEL_PRIORIDAD, EXA.NOMBRE "NOMBRE EXAMEN", 
                                EXA.CORTE_SUB, EXA.CORTE_NORMAL, EXA.CORTE_E1, EXA.CORTE_E2, EXA.DIRECCION
                                FROM EVALUADORES EVA
                                JOIN EXAMENES EXA
                                ON(EVA.EXAMENES_ID_EXAMEN = EXA.ID_EXAMEN)
                                JOIN CONDICION_CR CR
                                ON(CR.ID_CONDICION = EVA.CONDICION_CR_ID_CONDICION)
                                WHERE CR.ID_CONDICION = :id_condicionbv`;
                
    

    //bv significa el valor que espera como parametro. En este caso id.

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            QUERY_GET_USUARIO,
            [1],
            {
                maxRows: 0
            }
        );

        const result2 = await connection.execute(
            QUERY_GET_USUARIO,
            [2],
            {
                maxRows: 0
            }
        );

        const result3 = await connection.execute(
            QUERY_GET_USUARIO,
            [3],
            {
                maxRows: 0
            }
        );

        const result4 = await connection.execute(
            QUERY_GET_USUARIO,
            [4],
            {
                maxRows: 0
            }
        );

        const result5 = await connection.execute(
            QUERY_GET_USUARIO,
            [5],
            {
                maxRows: 0
            }
        );

        const result6 = await connection.execute(
            QUERY_GET_USUARIO,
            [6],
            {
                maxRows: 0
            }
        );

        const result7 = await connection.execute(
            QUERY_GET_USUARIO,
            [7],
            {
                maxRows: 0
            }
        );

        const result8 = await connection.execute(
            QUERY_GET_USUARIO,
            [8],
            {
                maxRows: 0
            }
        );

        const result9 = await connection.execute(
            QUERY_GET_USUARIO,
            [9],
            {
                maxRows: 0
            }
        );

        const result10 = await connection.execute(
            QUERY_GET_USUARIO,
            [10],
            {
                maxRows: 0
            }
        );

        const data = result.rows.map(row => {

            const obj = new Object();
            obj.condicion_cr = row[0];
            obj.sexo_masculino = row[1];
            obj.sexo_femenino = row[2];
            obj.nivel_prioridad = row[3];
            obj.nombre_examen = row[4];
            obj.corte_sub = row[5];
            obj.corte_normal = row[6];
            obj.corte_E1 = row[7];
            obj.corte_E2 = row[8];
            obj.direccion = row[9];
            return obj;
        })

        const data2 = result2.rows.map(row => {

            const obj = new Object();
            obj.condicion_cr = row[0];
            obj.sexo_masculino = row[1];
            obj.sexo_femenino = row[2];
            obj.nivel_prioridad = row[3];
            obj.nombre_examen = row[4];
            obj.corte_sub = row[5];
            obj.corte_normal = row[6];
            obj.corte_E1 = row[7];
            obj.corte_E2 = row[8];
            obj.direccion = row[9];
            return obj;
        })

        const data3 = result3.rows.map(row => {

            const obj = new Object();
            obj.condicion_cr = row[0];
            obj.sexo_masculino = row[1];
            obj.sexo_femenino = row[2];
            obj.nivel_prioridad = row[3];
            obj.nombre_examen = row[4];
            obj.corte_sub = row[5];
            obj.corte_normal = row[6];
            obj.corte_E1 = row[7];
            obj.corte_E2 = row[8];
            obj.direccion = row[9];
            return obj;
        })

        const data4 = result4.rows.map(row => {

            const obj = new Object();
            obj.condicion_cr = row[0];
            obj.sexo_masculino = row[1];
            obj.sexo_femenino = row[2];
            obj.nivel_prioridad = row[3];
            obj.nombre_examen = row[4];
            obj.corte_sub = row[5];
            obj.corte_normal = row[6];
            obj.corte_E1 = row[7];
            obj.corte_E2 = row[8];
            obj.direccion = row[9];
            return obj;
        })

        const data5 = result5.rows.map(row => {

            const obj = new Object();
            obj.condicion_cr = row[0];
            obj.sexo_masculino = row[1];
            obj.sexo_femenino = row[2];
            obj.nivel_prioridad = row[3];
            obj.nombre_examen = row[4];
            obj.corte_sub = row[5];
            obj.corte_normal = row[6];
            obj.corte_E1 = row[7];
            obj.corte_E2 = row[8];
            obj.direccion = row[9];
            return obj;
        })

        const data6 = result6.rows.map(row => {

            const obj = new Object();
            obj.condicion_cr = row[0];
            obj.sexo_masculino = row[1];
            obj.sexo_femenino = row[2];
            obj.nivel_prioridad = row[3];
            obj.nombre_examen = row[4];
            obj.corte_sub = row[5];
            obj.corte_normal = row[6];
            obj.corte_E1 = row[7];
            obj.corte_E2 = row[8];
            obj.direccion = row[9];
            return obj;
        })

        const data7 = result7.rows.map(row => {

            const obj = new Object();
            obj.condicion_cr = row[0];
            obj.sexo_masculino = row[1];
            obj.sexo_femenino = row[2];
            obj.nivel_prioridad = row[3];
            obj.nombre_examen = row[4];
            obj.corte_sub = row[5];
            obj.corte_normal = row[6];
            obj.corte_E1 = row[7];
            obj.corte_E2 = row[8];
            obj.direccion = row[9];
            return obj;
        })

        const data8 = result8.rows.map(row => {

            const obj = new Object();
            obj.condicion_cr = row[0];
            obj.sexo_masculino = row[1];
            obj.sexo_femenino = row[2];
            obj.nivel_prioridad = row[3];
            obj.nombre_examen = row[4];
            obj.corte_sub = row[5];
            obj.corte_normal = row[6];
            obj.corte_E1 = row[7];
            obj.corte_E2 = row[8];
            obj.direccion = row[9];
            return obj;
        })

        const data9 = result9.rows.map(row => {

            const obj = new Object();
            obj.condicion_cr = row[0];
            obj.sexo_masculino = row[1];
            obj.sexo_femenino = row[2];
            obj.nivel_prioridad = row[3];
            obj.nombre_examen = row[4];
            obj.corte_sub = row[5];
            obj.corte_normal = row[6];
            obj.corte_E1 = row[7];
            obj.corte_E2 = row[8];
            obj.direccion = row[9];
            return obj;
        })

        const data10 = result10.rows.map(row => {

            const obj = new Object();
            obj.condicion_cr = row[0];
            obj.sexo_masculino = row[1];
            obj.sexo_femenino = row[2];
            obj.nivel_prioridad = row[3];
            obj.nombre_examen = row[4];
            obj.corte_sub = row[5];
            obj.corte_normal = row[6];
            obj.corte_E1 = row[7];
            obj.corte_E2 = row[8];
            obj.direccion = row[9];
            return obj;
        })

        const array3 = data.concat(data2);
        const array4 = array3.concat(data3);
        const array5 = array4.concat(data4);
        const array6 = array5.concat(data5);
        const array7 = array6.concat(data6);
        const array8 = array7.concat(data7);
        const array9 = array8.concat(data8);
        const array10 = array9.concat(data9);
        const array11 = array10.concat(data10);

        const js = JSON.stringify(array11);
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

module.exports = getLaboratorio();