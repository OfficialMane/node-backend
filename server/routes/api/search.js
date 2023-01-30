const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// Search and get the data from the lessons collection
router.post('/', async (req, res) => {
  const lessons = await loadLessonsCollection();
  const allLessons = await lessons.find({}).toArray();
  let searchedResults = allLessons.filter(data =>
    data.location.match(req.body.inputData)
    )
  res.send(searchedResults)
  return;
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
