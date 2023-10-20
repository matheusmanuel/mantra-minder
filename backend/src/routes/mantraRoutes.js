const express = require('express');
const mantraRoutes = express.Router();
const mantraController = require('../controllers/mantraController');

mantraRoutes.post('/mantra/insert', mantraController.insertMantra);
mantraRoutes.put('/mantra/update', mantraController.updateMantra);
mantraRoutes.get('/mantras', mantraController.getAllMantras);
mantraRoutes.get('/mantra/:id', mantraController.getMantra);
mantraRoutes.post('/mantra', mantraController.deleteMantra);

module.exports = mantraRoutes;