// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const fs = require('fs');
const uri = "mongodb+srv://kasarschetan1122:HVqoqRg5GkExQVDr@cluster1.rjo2zv4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const multer  = require('multer')
const { ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();

//mongoose.connect('mongodb://localhost:27017/imageDB', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const ImageSchema = new mongoose.Schema({
  data:Buffer
});

const Image = mongoose.model('Image', ImageSchema);

global.titleImageBuff = "";
global.albumImagesBuff = [];

app.use(cors());

const upload = multer();
app.use(bodyParser.json());

app.post('/add', async (req, res) => {
    const database = client.db("mydb");
    const mycollection = database.collection("mycollection");
    req.body.userData.titleData.titleImage = global.titleImageBuff;
    req.body.userData.albumData.photos = albumImagesBuff;
    const result = await mycollection.insertOne(req.body.userData);
    res.send("Data Received");
});

app.get('/get', async (req, res) => {

  const query = {username:req.query.username};
  console.log(query);
  const database = client.db("mydb");
  const mycollection = database.collection("mycollection");

  const result = await mycollection.find(query).toArray();
  res.json(result);
});

app.post('/upload', upload.single("titleImage"), async (req, res) => {

  if(req.file)
  {
    const fileData = req.file.buffer;
    global.titleImageBuff = fileData;
  }
  else
  {
    const imageFile = fs.readFileSync('./titleImg/Travel.jpg');
    global.titleImageBuff = imageFile;
  }
  /*const database = client.db("mydb");
  const mycollection = database.collection("mycollection"); 
  const result = await mycollection.insertOne({mydata:fileData});

  const storedImage = await mycollection.findOne();
  const base64Image = storedImage.mydata.toString('base64'); 
  const dataUrl = `data:image/jpeg;base64,${base64Image}`;
  console.log(dataUrl);*/

  res.send("Data received");

  /*if(req.file)
  global.titleImageName = req.file.filename;

  else
  global.titleImageName = "Travel.jpg";*/

});

app.post('/album', upload.array("photoAlbum", 30),(req, res, next) => {
  const doc = req.files.map(e=>(e.buffer));
  const doc1 = doc.map(e=>({e}));
  global.albumImagesBuff = doc1;
  res.sendStatus(204); 
});

app.post('/userLogin', async (req, res) => {
  const database = client.db("mydb");
  const mycollection = database.collection("userLogin");

  const query = {username:req.body.username, password:req.body.password};
  const result = await mycollection.findOne(query);
  
  if(result)
  {
    res.send("User Varified");
  }
  else
  {
    res.send("Not varified");
  }
});

app.post('/signUp-User', async (req, res) => {
  const query = {username:req.body.username}; 
  const database = client.db("mydb");
  const mycollection = database.collection("userLogin");
  const result = await mycollection.findOne(query);

  if(!result)
  {
    await mycollection.insertOne({username:req.body.username, password:req.body.password});
    res.send("Unique User");
  }
  else
  {
    res.send("Not Unique");
  }
});

app.post('/public-card', async (req, res)=>{
  const objectId = new ObjectId(req.body.cardID); 
  const query1 = {_id:objectId}; 
  const query2 = {
    $set: 
    {
      status: "public"
    },
    $currentDate: { lastUpdated: true }
  }
  const database = client.db("mydb");
  const mycollection = database.collection("mycollection");
  const result = await mycollection.updateOne(query1, query2);
  res.sendStatus(204);
});

app.post('/delete-card', async (req, res)=>{
  const objectId = new ObjectId(req.body.cardID); 
  const query = {_id:objectId}; 
  const database = client.db("mydb");
  const mycollection = database.collection("mycollection");
  const result = await mycollection.deleteOne(query);
  res.sendStatus(204);
});

app.get('/access-public-cards', async (req, res)=>{ 
  const query = {status:"public"}
  const database = client.db("mydb");
  const mycollection = database.collection("mycollection");
  const result = await mycollection.find(query).sort({_id:-1}).toArray();
  console.log("Result : ");
  res.json(result);
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
