const express = require('express');
const bodyParser = require('body-parser');
// Connect to mongo db also can do it like const { MongoClient } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./database/connect');
// const routes = require('./routes');
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}
);

app.use('/', require('./routes'));


mongodb.initDb((error, mongodb) =>{
    if (error){
        console.log(error);
    } else{
        app.listen(port, () =>{
            console.log(`Server is running on ${port} and it's connected to the database`);
        });
    }
});