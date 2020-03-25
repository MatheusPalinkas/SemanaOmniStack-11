const express = require('express');
const routes = express.Router();

const ongController = require('./controllers/OngController');
const incidentsController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

//Ongs
routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);
//Incidents
routes.get('/incidents', incidentsController.index);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);
//Profile
routes.get('/profile', profileController.index);
//Login
routes.post('/session', sessionController.create);

module.exports = routes;