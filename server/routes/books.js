/*
FILE:       server/config/db.js
AUTHOR:     Jason (Han Wool) Na
STUDENT ID: 301252192
WEB APP:    Favourite Book List
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    res.render('books/details', {
      title: 'Add Book',
      books: ''
    })

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let createdBook = book({
      'Title': req.body.title,
      'Description': req.body.description,
      'Price': req.body.price,
      'Author': req.body.author,
      'Genre': req.body.genre
    });

    book.create(createdBook, (err, bookToAdd) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/books');
      }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let bookId = req.params.id;

    book.findById(bookId, (err, bookToEdit) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.render('books/details', {
          title: 'Edit Book',
          books: bookToEdit
        });
      }
    });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let bookId = req.params.id;

    let updatedBook = book({
      '_id': bookId,
      'Title': req.body.title,
      'Description': req.body.description,
      'Price': req.body.price,
      'Author': req.body.author,
      'Genre': req.body.genre
    });

    // Model.update() is deprecated; updateOne() has been used instead
    book.updateOne({ _id: bookId }, updatedBook, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/books');
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let bookId = req.params.id;

    book.remove({ _id: bookId }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/books');
      }
    });

});


module.exports = router;
