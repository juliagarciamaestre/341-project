const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacs').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('contacs')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

//Not working!
//Create a POST route for creating new contacts
//that returns the ID of the new contact and a 201 status
const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const result = await mongodb.getDb().db().collection('contacs').insertOne(contact);
  console.log(result);
  if (result.acknowledged){
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || "Error happened when trying to create a new contact");
  }
};

//Create a PUT route for updating a contact that returns a 204 status
const updateContact = async (req, res) =>{
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const result = await mongodb
    .getDb()
    .db()
    .collection('contacs')
    .replaceOne({ _id: userId }, contact);
  console.log(result);
  if (result.modifiedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(result.error || "Error ocurred while updating");
  }

};


//Create a DELETE route for deleting a contact that returns a 200 status
const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacs').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { getAll, getSingle,  createContact, updateContact, deleteContact};