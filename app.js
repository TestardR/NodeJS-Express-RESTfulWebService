const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

const app = express();
var db;
if (process.env.ENV == 'Test') {
  db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
  db = mongoose.connect('mongodb://localhost/bookAPI');
}
const Book = require('./models/bookModel');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);
// app.use('/api/authors', authRouter);

app.get('/', (req, res) => {
  res.send('welcome to my API!');
});

app.listen(port, () => {
  console.log(`Gulp is running the app on port ${port}`);
});

module.exports = app;
