const { MongoClient } = require('mongodb');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const port = 8000;
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
    // creatting the db os of exist fetch
    const database = client.db('foodMaster');
    // create a collection or fetch if alredy have
    const usersCollection = database.collection('users');

    // POST API
    app.post('/user', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
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
