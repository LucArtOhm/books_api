const res = require('express/lib/response');

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    morgan = require('morgan'),
    cors = require('cors');

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // This uses CORS and allows all domains to have access to the app

const { check, validationResult } = require('express-validator');

// Use passport from external files
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport.js');

// Mongoose Models
const Books = Models.Book;
const Users = Models.User;

/* mongoose.connect('mongodb://localhost:27017/myBooksDB', { useNewUrlParser: true, useUnifiedTopology: true }); */
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// READ Method (get requests)

// Return Homepage
app.get('/', (req, res) => {
    res.send('Welcome to the first Queer Online Club for Children!');
});

// Return a list of ALL books to the user --- Works as of 18.05.
app.get('/books', (req, res) => {
    Books.find()
        .then((books) => {
            res.status(201).json(books);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
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
app.post('/users',
    [
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
    ],
    (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = Users.hashPassword(req.body.Password);
        Users.findOne({ Username: req.body.Username })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.Username + 'already exists');
                } else {
                    Users
                        .create({
                            Username: req.body.Username,
                            Password: hashedPassword,
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
app.put('/users/:Username',
    passport.authenticate('jwt', { session: false }),
    [
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
    ],
    (req, res) => {
        // check validation object for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

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

// Error handling middleware function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Oh no! something broke!");
});

// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on port ' + port);
});