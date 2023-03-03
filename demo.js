const { MongoClient } = require('mongodb'); // Connect to the mongodb db

async function main(){
    //Connection uri
    const uri = "mongodb+srv://juliagarciamaestre:demopass@cluster0.gqrlivu.mongodb.net/?retryWrites=true&w=majority";

    //Create an instance of client
    const client = new MongoClient(uri);

    //Connect to cluster
    await client.connect(); //returns a promise. Awai block further execution until the operation has completed

    //Errors managment
    try{
        await client.connect();

        // await listDatabases(client);

        // await createListing(client, {
        //     name: "Lovely Loft",
        //     sumarry: "A charming loft in Paris",
        //     bedroms: 2,
        //     bathrooms: 1
        // })

        await createMultipleListings(client, [{
            name: "Hola 1",
            summary: "Esto es un saludo",
            bedroms: 1,
            bathrooms: 1
        },
        {
            name: "Hola 45",
            summary: "Esto es un saludo x2",
            bedroms: 10,
            bed: 5
        }
    ]);

    await updateListingByName(client, "Infinite Views", {bedrooms: 7, beds:8});
    } catch (e){
        console.error(e);
    } finally{
        await client.close();
    }
} 

main().catch(console.error);

//Create multiple documents
async function createMultipleListings (client, newListings){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    console.log(`${result.insertedCount} new listings created with the following id(s):`);
    console.log(result.insertedIds);
}

//Create a single document
async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}
//List the databases in our cluster

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}

async function updateListingByName(client, nameOfListing, updateListing){
    const result = await client.db('sample_airbnb').collection("listingsAndReviews").updateOne({name: nameOfListing}, {$set: updateListing});

    console.log(`${result.matchedCount} document(s) matchet the query criteria`);
    console.log(`${result.modifiedCount} document(s) was updated`);
}