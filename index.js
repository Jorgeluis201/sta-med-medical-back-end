const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getInfoPaciente = require ("./controllers/getInfoPaciente");
const getUsuario = require ("./controllers/getUsuario");
const getCompensacion = require ("./controllers/getCompensacion");
const getEnfermedadPaciente = require ("./controllers/getEnfermedadesPaciente");
const getAgenda = require('./controllers/getAgenda');
const getLaboratorio = require('./controllers/getLaboratorio');
const getMolestias = require('./controllers/getMolestias');
const getTratamientos = require('./controllers/getTratamientos');
const getPreguntas = require('./controllers/getPreguntasCr');
const getAvisos = require('./controllers/getAvisos');
const getSintomas = require('./controllers/getSintomas');
const port = 4000;

const app = express();

app.use(cors());

app.use('/api',require('./routes/api'));

app.get('/getInfoPaciente', (req,res) => {
    getInfoPaciente.then((response) => {
        res.send(response);
    });
})

app.get('/getAvisos', (req,res) => {
    getAvisos.then((response) => {
        res.send(response);
    });
})

app.get('/getSintomas', (req,res) => {
    getSintomas.then((response) => {
        res.send(response);
    });
})


app.get('/getLaboratorio', (req, res) => {
    getLaboratorio.then((response) => {
        res.send(response);
    })
})

app.get('/getPreguntasCr', (req, res) => {
    getPreguntas.then((response) => {
        res.send(response);
    })
})

app.get('/getTratamiento', (req, res) => {
    getTratamientos.then((response) => {
        res.send(response);
    })
})

app.get('/getMolestias', (req, res) => {
    getMolestias.then((response) => {
        res.send(response);
    })
})

app.get('/getAgenda', (req,res) => {
    getAgenda.then((response) => {
        res.send(response);
    });
})

app.get('/getUsuario/:email', async(req,res) => {

    
    const email = req.params.email;

    // getUsuario.then((response) => {
    //     res.send(response);
    // });

    const oracledb = require('oracledb');
    const dbConfig = require('./database/dbconfig');

    const QUERY_GET_USUARIO = `SELECT RUT,nombres || ' ' || APELLIDO_PAT || ' ' || Apellido_mat  , usuario, hash_clave,email
                                FROM PERSONAS
                                WHERE email = :emailbv and ROLES_ID_ROL = :roles_id_rolbv`;

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            QUERY_GET_USUARIO,
            [email,2],
            {
                maxRows: 0
            });

        const data = result.rows.map(row => {

            const obj = new Object();
            obj.rut = row[0];
            obj.nombre = row[1];
            obj.usuario = row[2];
            obj.hash_clave = row[3];
            obj.email = row[4];

            return obj;
        })

        const js = JSON.stringify(data);
        res.send(js);

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
})


app.get('/getCompensacion', (req,res) => {

    getCompensacion.then((response) => {
        res.send(response);
    });
})

app.get('/getEnfermedadPaciente', (req,res) => {
    getEnfermedadPaciente.then((response) => {
        res.send(response);
    });
})

app.listen(port, () => {
    console.log(`server puerto ${port}`);
})

