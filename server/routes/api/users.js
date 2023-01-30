const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// Get all the users
router.get('/', async (req, res) => {
  const users = await loadUsersCollection();
  res.send(await users.find({}).toArray());
  return;
});

// Create a new user
router.post('/', async (req, res) => {
  const users = await loadUsersCollection();
  await users.insertOne({
    email: req.body.email,
    password: req.body.password
  });
  res.status(201).send();
  return;
});

// Delete a specific user
router.delete('/:id', async (req, res) => {
  const users = await loadUsersCollection();
  await users.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

async function loadUsersCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://mane:mane@cluster0.xjpok6e.mongodb.net/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return client.db('test').collection('users');
}

module.exports = router;
