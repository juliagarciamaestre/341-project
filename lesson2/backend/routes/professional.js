const routes = require('express').Router();
const myController = require('../controllers/professional');

routes.get('/', myController.getData);

module.exports = routes;

