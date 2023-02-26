//L1: const routes = require('express').Router();

//But doing it this way it's better for escalation(in the future when we have a lot of routes, will be easier)
const express = require('express');
const router = express.Router();

const contactsController = require('../controller/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

module.exports = router;