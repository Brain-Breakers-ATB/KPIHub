var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer=require("multer");

var app = Express();
app.use(cors());
const port = 3000;

var CONNECTION_STRING = "mongodb+srv://admin:dgdd4333.6fdd5FGRE@cluster0.b0i2ahr.mongodb.net/?retryWrites=true&w=majority";
var DATABASENAME = "KPIHubdb";
var database;

app.listen(port,()=>{
    Mongoclient.connect(CONNECTION_STRING, (error, client)=>{
        database=client.db(DATABASENAME);
        console.log(`Example app listening on port ${port}`);
    })
    })

app.get('/api/activities/getActivities', (request, response)=>{
  database.collection ("activities").find({}).toArray((error, result)=>{
    response.send (result);
  })
})

app.post('/api/activities/addActivities', multer (). none (), (request, response) =>{
  database.collection ("activities").count({}, function(error, numOfDocs) {
    database.collection("activities").insertOne({
      id: (numOfDocs+1).toString(),
      description:request.body.newNotes
    })
    response.json ("Added Succesfully");
  })
})

app.delete('/api/activities/deleteActivities', (request, response) => {
  database.collection ("activities").deleteOne({
    id: request.query.id
  });
  response.json("Delete Successfully");
})
