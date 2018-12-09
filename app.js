const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

const app = express();
const bookRouter = express.Router();

const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);

bookRouter
  .route('/Books')
  .post(function(req, res) {
    var book = new Book(req.body);
    book.save();
    res.status(201).send(book);
  })
  .get(function(req, res) {
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

bookRouter.route('/Books/:bookid').get(function(req, res) {
  Book.findById(req.params.bookid, function(err, book) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(book);
    }
  });
});

app.get('/', (req, res) => {
  res.send('welcome to my API!');
});

app.listen(port, () => {
  console.log(`Gulp is running the app on port ${port}`);
});
