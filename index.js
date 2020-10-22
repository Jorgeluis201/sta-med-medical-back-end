const express = require('express');
require('dotenv').config();
const cors = require('cors')


// Crear aplicacion de express
const app = express();

// CORS

app.use(cors());

// Directorio publico
// use, en express es conocido como un middelware, no es mas que una funcion que se ejecuta en el momento que alguien hace una peticion a nuestro servidor
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );


// Rutas
// TODO: auth // crear,login,renew

app.use('/medical/auth', require('./routes/auth') );
// 1.Creamos la ruta para los endpoints de events.
app.use('/medical/diary', require('./routes/diary') );



// Escuchar peticiones
app.listen( process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT}`);
});

