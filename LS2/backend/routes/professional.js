//L1: const routes = require('express').Router();

//But doing it this way it's better for escalation(in the future when we have a lot of routes, will be easier)
const express = require('express');

const professionalController =require('../controller/professional');

const router = express.Router();

//L1: routes.get('/', myController.awesomeFunction);
router.get('/', professionalController.getData);//getData calls a function in the controller

module.exports = router;