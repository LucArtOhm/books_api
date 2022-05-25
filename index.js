const res = require('express/lib/response');

const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  Models = require('./models.js');
const { request } = require('express');
morgan = require('morgan');

app = express(),
  app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

const Books = Models.Book;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myBooksDB', { useNewUrlParser: true, useUnifiedTopology: true });


/* let books = [
  {
    Title: "The extraordinary life of Alan Turing",
    ReadingAge: "7 - 99",
    Publisher: {
      Name: "Puffin",
      OLanguage: "English",
      ReleaseYear: 2020
    },
    Description: "The story of Alan Turing is portrayed",
    Genre: "Computer Programming",
    Author: {
      Name: "Michael Lee Richardson",
      Origin: "Glasgow, Scottland"
    },
    Illustrator: "Freda Chiu",
    CoverURL: "https://www.penguin.co.uk/content/dam/prh/books/316/316558/9780241434017.jpg.transform/PRHDesktopWide_small/image.jpg",
    DigitalVersion: true
  },
  {
    Title: "Julian Is a Mermaid",
    ReadingAge: "4 - 99",
    Publisher: {
      Name: "Candlewick",
      OLanguage: "English",
      ReleaseYear: 2018
    },
    Description: "The story of a boy, whose Grandma encourages his beautiful but different taste for dressing up and living life",
    Genre: "Myths & Tales",
    Author: {
      Name: "Jessica Love",
      Origin: "California, USA"
    },
    Illustrator: "Jessica Love",
    CoverURL: "https://images.booksense.com/images/458/690/9780763690458.jpg",
    DigitalVersion: true
  },
  {
    Title: "My Footprints",
    ReadingAge: "5 - 99",
    Publisher: {
      Name: "Capstone Editions",
      OLanguage: "Language",
      ReleaseYear: 2019
    },
    Description: "A story of courage in the face of uncertainty",
    Genre: "Bullying",
    Author: {
      Name: "Bao Phi",
      Origin: "Vietnam; USA"
    },
    Illustrator: "Basia Tran",
    CoverURL: "https://img.buzzfeed.com/buzzfeed-static/static/2020-02/19/22/asset/44477077c29e/sub-buzz-501-1582150315-11.jpg?downsize=600:*&output-format=auto&output-quality=auto",
    DigitalVersion: false
  },
  {
    Title: "Introducing Teddy",
    ReadingAge: "5 - 99",
    Publisher: {
      Name: "BLOOMSBURY",
      OLanguage: "English",
      ReleaseYear: 2016
    },
    Description: "Gender and Friendship explained through a story",
    Genre: "Biography",
    Author: {
      Name: "Jessica Walton",
      Origin: "Melbourne, Australia"
    },
    Illustrator: "Dougal McPherson",
    CoverURL: "https://img.buzzfeed.com/buzzfeed-static/static/2020-02/20/19/asset/0c82d8fc0a0f/sub-buzz-788-1582226458-1.jpg?downsize=600:*&output-format=auto&output-quality=auto",
    DigitalVersion: true
  },
  {
    Title: "The Christmas Truck",
    ReadingAge: "4 - 99",
    Publisher: {
      Name: "Narragarden LLC",
      OLanguage: "English",
      ReleaseYear: 2014
    },
    Description: "A Christmas story full of adventure with Papa, Dad, an amzing kid, and grandma",
    Genre: "Christmas",
    Author: {
      Name: "J.B. Blankenship",
      Origin: "Unknown"
    },
    Illustrator: "Cassandre Bolan",
    CoverURL: "https://images.booksense.com/images/408/743/9780990743408.jpg",
    DigitalVersion: false
  },
  {
    Title: "And Tango Makes Three",
    ReadingAge: "2 - 99",
    Publisher: {
      Name: "Little Simon",
      OLanguage: "English",
      ReleaseYear: 2015
    },
    Description: "The true story of two male pinguins who became fathers in NYC",
    Genre: "Adoption",
    Author: [{
      Name: "Justin Richardson",
      Origin: "New York, USA"
    },
    {
      Name: "Peter Parnell",
      Origin: "New York, USA"
    }],
    Illustrator: "Henry Cole",
    CoverURL: "https://img.buzzfeed.com/buzzfeed-static/static/2020-02/19/20/asset/9bc4c1b086f2/sub-buzz-374-1582143100-10.jpg?downsize=600:*&output-format=auto&output-quality=auto",
    DigitalVersion: true
  },
  {
    Title: "Prince & Knight",
    ReadingAge: "4 - 99",
    Publisher: {
      Name: "little bee books",
      OLanguage: "English",
      ReleaseYear: 2018
    },
    Description: "New kind of story expanding the Charming Prince ideology",
    Genre: "Royalty Tales",
    Author: {
      Name: "Daniel Haack",
      Origin: "Wisconsin, USA"
    },
    Illustrator: "Stevie Lewis",
    CoverURL: "https://img.buzzfeed.com/buzzfeed-static/static/2020-02/19/20/asset/2688b0364b69/sub-buzz-386-1582143959-32.jpg?downsize=600:*&output-format=auto&output-quality=auto",
    DigitalVersion: false
  },
  {
    Title: "When Aidan became a brother",
    ReadingAge: "5 - 99",
    Publisher: {
      Name: "Lee & Low Books",
      OLanguage: "English",
      ReleaseYear: 2019
    },
    Description: "A story of a boy who was thought of as a girl when he was born",
    Genre: "Family",
    Author: {
      Name: "Kyle Lukoff",
      Origin: "Illinois, USA"
    },
    Illustrator: "Kaylani Juanita",
    CoverURL: "https://img.buzzfeed.com/buzzfeed-static/static/2020-02/19/19/asset/7cbde0618b40/sub-buzz-316-1582140393-5.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
    DigitalVersion: false
  },
  {
    Title: "Sharice\'s Big Voice",
    ReadingAge: '4 - 99',
    Publisher: {
      Name: "HarperCollins",
      OLanguage: "English",
      ReleaseYear: 2021
    },
    Description: 'The recounting of the first Native, Open Gay, American who made it to congress',
    Genre: "Biography",
    Author: [{
      Name: "Sharice Davids",
      Origin: "Germany; USA"
    },
    {
      Name: "Nancy K. Mays",
      Origin: "Kansas, USA"
    }],
    Illustrator: "Joshua Mangeshig Pawis-Steckley",
    CoverURL: "https://images-na.ssl-images-amazon.com/images/I/71jlUAwd5FL.jpg",
    DigitalVersion: true
  },
  {
    Title: "Stonewall: A Building. An Uprising. A Revolution",
    ReadingAge: "5 - 99",
    Publisher: {
      Name: "Random House Books for Young Readers",
      OLanguage: "English",
      ReleaseYear: 2019
    },
    Description: "The recounting of Stone Wall",
    Genre: "Government",
    Author: {
      Name: "Rob Sanders",
      Origin: "Missouri, USA"
    },
    Illustrator: "Jamey Christoph",
    CoverURL: "https://images3.penguinrandomhouse.com/cover/700jpg/9781524719524",
    DigitalVersion: true
  },
  {
    Title: "Pride: The Story of Harvey Milk and the Rainbow Flag",
    ReadingAge: "5 - 99",
    Publisher: {
      Name: "Random House Books for Young Readers",
      OLanguage: "English",
      ReleaseYear: 2018
    },
    Description: "The story of Harvey Milk",
    Genre: "1900s America",
    Author: {
      Name: "Rob Sanders",
      Origin: "Missouri, USA"
    },
    Illustrator: "Steven Salerno",
    CoverURL: "https://images3.penguinrandomhouse.com/cover/700jpg/9780399555312",
    DigitalVersion: true
  }
];
 */
let users = []

// READ Method (get requests)

// Return Homepage
app.get('/', (req, res) => {
  res.send('Welcome to the first Queer Online Club for Children!');
});

// Return a list of ALL books to the user --- Works as of 18.05.
app.get('/books', passport.authenticate('jwt', { session: false }), (req, res) => {
  Books.find()
    .then((books) => {
      res.status(201).json(books);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data (reading age, publisher, description, genre, author, illustrator, cover URL, whether a digital version is available) 
// about a single book by title --- Works as of 18.05.
app.get('/books/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Books.findOne({ Title: req.params.Title })
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a publisher by name --- Works as of 23.05.
app.get('/books/publishers/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Books.find({ 'Publisher.Name': req.params.Name })
    .then((book) => {
      res.status(201).json(book.publisher);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return a list of books with the same genre --- Works as of 24.05.
app.get('/books/genres/:Genre', passport.authenticate('jwt', { session: false }), (req, res) => {
  Books.find({ Genre: req.params.Genre })
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about an author by name --- Works as of 23.05.
app.get('/books/authors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Books.find({ 'Author.Name': req.params.Name })
    .then((book) => {
      res.status(201).json(book.Author);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return a list of books with the same illustrator --- Works as of 24.05.
app.get('/books/illustrators/:Illustrator', passport.authenticate('jwt', { session: false }), (req, res) => {
  Books.findOne({ Illustrator: req.params.Illustrator })
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a list of all users --- Works as of 18.05.
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username --- Works as of 18.05.
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// CREATE Method (post requests)

// Allow new users to register --- Works as of 18.05.2022 
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// Allow users to add a book to their list of favorites--- Works as of 23.05.2022 
app.post('/users/:Username/books/:BookId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $push: { FavoriteBooks: req.params.BookId } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// DELETE Method (delete request)

// Allow users to remove a book from their list of favorites --- Works as of 23.05.2022 
app.delete('/users/:Username/books/:BookId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteBooks: req.params.BookId } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Allow existing users to deregister --- Works as of 18.05.
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
})

// UPDATE Method (put requests)

// Allow users to update their user info (username, password, email, date of birth) --- Works as of 18.05.
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  )
})

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
})

