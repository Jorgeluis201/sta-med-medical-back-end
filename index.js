const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getInfoPaciente = require ("./controllers/getInfoPaciente");
const getUsuario = require ("./controllers/getUsuario");
const getCompensacion = require ("./controllers/getCompensacion");
const getEnfermedadPaciente = require ("./controllers/getEnfermedadesPaciente");
const getAgenda = require('./controllers/getAgenda');
const port = 4000;

const app = express();

app.use(cors());

app.get('/getInfoPaciente', (req,res) => {
    getInfoPaciente.then((response) => {
        res.send(response);
    });
})

app.get('/getAgenda', (req,res) => {
    getAgenda.then((response) => {
        res.send(response);
    });
})

app.get('/getUsuario', (req,res) => {
    getUsuario.then((response) => {
        res.send(response);
    });
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

