const { MongoClient } = require('mongodb');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const port = 8000;
const ObjectId = require('mongodb').ObjectId;
// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();
const user = process.env.USER;
const password = process.env.PASSWORD;

// Mongo config
const uri = `mongodb+srv://${user}:${password}@sandbox.5jrgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// function for inserting document
async function run() {
  try {
    await client.connect();
    // creatting the db or of exist fetch
    const database = client.db('foodMaster');
    // create a collection or fetch if alredy have
    const usersCollection = database.collection('users');

    // POST API to add user
    app.post('/addUser', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    // Get API for all users
    app.get('/users', async (req, res) => {
      const result = await usersCollection.find({}).toArray();
      // console.log(result);
      res.send(result);
    });
    // Delete single user
    app.delete('/delete-user/:id', async (req, res) => {
      const id = req.params.id;
      const result = await usersCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
// Running the run function
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from Node js reload!');
});

app.listen(port, () => {
  console.log('Listening to port', port);
});
