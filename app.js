const express = require('express'),
  mongoose = require('mongoose');

const app = express();
const bookRouter = express.Router();

const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');
const port = process.env.PORT || 3000;

app.use('/api', bookRouter);

bookRouter.route('/Books').get(function(req, res) {
  var query = {};
  if (req.query.genre) {
    query.genre = req.query.genre;
  }
  Book.find(query, function(err, books) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(books);
    }
  });
});

app.get('/', (req, res) => {
  res.send('welcome to my API!');
});

app.listen(port, () => {
  console.log(`Gulp is running the app on port ${port}`);
});
