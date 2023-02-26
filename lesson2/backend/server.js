const express = require('express');
const bodyParser = require('body-parser');
const professionalRouter = require('./routes/professional');
// const MongoClient = require('mongodb').MongoClient;
// const mongodb = require('./database/connect');
// const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser, json());

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/professional', professionalRouter);


// mongodb.initDb((err, mongodb) => {
//     if(err){
//         console.log(err);
//     } else {
//         app.listen(port);
//         console.log(`Connected to db and listening on {$port}`);
//     }
// });
