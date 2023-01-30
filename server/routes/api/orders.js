const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// Get all the orders
router.get('/', async (req, res) => {
  const orders = await loadOrdersCollection();
  res.send(await orders.find({}).toArray());
  return;
});

// Create a new order
router.post('/', async (req, res) => {
  const orders = await loadOrdersCollection();
  await orders.insertOne({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    lessonId: req.body.lessonId,
    numberOfSpace: req.body.numberOfSpace
  });
  res.status(201).send();
  return;
});

// Delete a specific order
router.delete('/:id', async (req, res) => {
  const orders = await loadOrdersCollection();
  await orders.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});


async function loadOrdersCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://mane:mane@cluster0.xjpok6e.mongodb.net/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return client.db('test').collection('orders');
}

module.exports = router;
