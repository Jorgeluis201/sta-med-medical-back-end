/*

    Rutas de usuarios /auth
    host + /medical/auth

    */

const { Router } = require('express');
const { loginUsuario } = require('../controllers/auth');

    const router = Router();

    router.post('/',loginUsuario);

    module.exports = router;