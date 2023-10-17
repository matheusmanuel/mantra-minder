const express = require('express');
const mantraRoutes = express.Router();
const mantraController = require('../controllers/mantraController');

mantraRoutes.post('/mantra/insert', mantraController.insertMantra);
mantraRoutes.put('/mantra/update', mantraController.updateMantra);
// mantraRoutes.get('/mantras', )
// mantraRoutes.delete('/mantra')

module.exports = mantraRoutes;