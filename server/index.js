const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

// All the middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); //Logger middleware

// Static file
app.use(express.static('public'));

// Routing URLs
app.use('/lessons', require('./routes/api/lessons'));
app.use('/orders', require('./routes/api/orders'));
app.use('/search', require('./routes/api/search'));
app.use('/user', require('./routes/api/users'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`The backend server is running on port ${port}`));
