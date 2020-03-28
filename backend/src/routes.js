const express = require('express');

//Validations
const ongValidation = require('./validations/OngValidation');
const incidentsValidation = require('./validations/IncidentsValidation');
const profileValidation = require('./validations/ProfileValidation');
const sessionValidation = require('./validations/SessionValidation');

//Controllers
const ongController = require('./controllers/OngController');
const incidentsController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();

//Ongs
routes.get('/ongs', ongController.index);
routes.post('/ongs', ongValidation.create, ongController.create);
//Incidents
routes.get('/incidents', incidentsValidation.index, incidentsController.index);
routes.post('/incidents', incidentsValidation.create, incidentsController.create);
routes.delete('/incidents/:id', incidentsValidation.delete, incidentsController.delete);
//Profile
routes.get('/profile', profileValidation.index, profileController.index);
//Login
routes.post('/session', sessionValidation.create, sessionController.create);

module.exports = routes;