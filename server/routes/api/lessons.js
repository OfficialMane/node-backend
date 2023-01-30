const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// Get all the lessons
router.get('/', async (req, res) => {
  const lessons = await loadLessonsCollection();
  res.send(await lessons.find({}).toArray());
  return;
});

// Create a new lesson
router.post('/', async (req, res) => {
  const lessons = await loadLessonsCollection();
  await lessons.insertOne({
    topic: req.body.topic,
    location: req.body.location,
    price: req.body.price,
    space: req.body.space
  });
  res.status(201).send();
  return;
});

// Modify a specific lesson space
router.put('/:id', async (req, res) => {
  const lessons = await loadLessonsCollection();
  await lessons.updateOne(
    { _id: new mongodb.ObjectID(req.params.id) },
    { $inc: { space: -1 }}
  );
  res.status(201).send();
  return;
});

// Delete a specific lesson
router.delete('/:id', async (req, res) => {
  const lessons = await loadLessonsCollection();
  await lessons.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

async function loadLessonsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://mane:mane@cluster0.xjpok6e.mongodb.net/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return client.db('test').collection('lessons');
}

module.exports = router;
