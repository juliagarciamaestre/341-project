//L1: const routes = require('express').Router();

//But doing it this way it's better for escalation(in the future when we have a lot of routes, will be easier)
const express = require('express');
const router = express.Router();

const contactsController = require('../controller/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

// //Create a POST route to create a new contact. 
router.post('/', contactsController.createContact);

// // Create a PUT route to update a contact. 
router.put('/:id', contactsController.updateContact);

// Create a DELETE route to delete a contact.
router.delete('/:id', contactsController.deleteContact);

module.exports = router;