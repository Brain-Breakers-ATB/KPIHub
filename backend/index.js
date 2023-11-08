// Import necessary modules
var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");
const mongoose = require('mongoose')

// Create an instance of the Express application
var app = Express();
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(Express.json())
const port = 3000; // Define the port number for the server

// MongoDB connection information
var CONNECTION_STRING =
  "mongodb+srv://admin:dgdd4333.6fdd5FGRE@cluster0.b0i2ahr.mongodb.net/?retryWrites=true&w=majority";
var DATABASENAME = "KPIHubdb";
var database;

// Start the server and establish a MongoDB connection
app.listen(port, () => {
  Mongoclient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASENAME);
    console.log(`Example app listening on port ${port}`);
  });
});

// Create a single set of CRUD endpoints that accept a collection name as a URL parameter

// Route to get items from a specific collection
app.get('/api/:collection/GetItems', (request, response) => {
  const collectionName = request.params.collection;
  const collection = database.collection(collectionName);
  collection.find({}).toArray((error, result) => {
    response.send(result);
  });
});

// Route to add an feedback form to a feedback collection
app.post('/api/feedback/AddItem', multer().none(), (request, response) => {
  const collectionName = 'feedback';
  const collection = database.collection(collectionName);

  // Insert a document into the specified collection
  const dataToInsert = {
    name: request.body.name,
    email: request.body.email,
    message: request.body.message,
    createdAt: new Date(), // Add a "createdAt" timestamp
    createdBy: request.user, // Add information about the user who made the request
  };

  collection.insertOne(dataToInsert, (error, result) => {
    if (error) {
      response.status(500).json({ error: "Error adding item" });
    } else {
      response.json(`Added to ${collectionName} Successfully`);
    }
  });
});

// Route to delete an item from a specific collection
app.delete('/api/:collection/DeleteItem', (request, response) => {
  const collectionName = request.params.collection;
  const collection = database.collection(collectionName);
  const itemId = request.query.id;
  
  // Delete a document from the specified collection based on the provided id
  collection.deleteOne({ id: itemId }, (error, result) => {
    if (error) {
      response.status(500).json({ error: "Error deleting item" });
    } else {
      response.json(`Deleted from ${collectionName} Successfully`);
    }
  });
});
