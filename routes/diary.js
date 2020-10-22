// 1.Importar router que viene en spress
const { Router } = require('express');
const { getEventos } = require('../controllers/diary');
const router = Router();


router.get('/',getEventos);

module.exports = router;