import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const doc = {
    name: "Pranav",
    roll: "21",
  }

const database = client.db("mydb");
const mycollection = database.collection("mycollection");
const result = await mycollection.insertOne(doc);

client.close();