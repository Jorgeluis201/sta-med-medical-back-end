const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getInfoPaciente = require ("./controllers/getInfoPaciente");
const getUsuario = require ("./controllers/getUsuario");

const getEnfermedadPaciente = require ("./controllers/getEnfermedadesPaciente");
const port = 4000;

const app = express();

app.use(cors());

// app.get('/getInfoPaciente', (req,res) => {
//     getInfoPaciente.then((response) => {
//         res.send(response);
//     });
// })

app.get('/getUsuario', (req,res) => {

    getUsuario.then((response) => {
        res.send(response);
    });
})



// app.get('/getEnfermedadPaciente', (req,res) => {
//     getEnfermedadPaciente.then((response) => {
//         res.send(response);
//     });
// })

app.listen(port, () => {
    console.log(`server puerto ${port}`);
})

