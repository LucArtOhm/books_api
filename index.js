const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');

app.use(bodyParser.json());

/* app.use(morgan('common'));
app.use(express.static('public')); */


let books = [
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

let users = [
  {
    Username: "Tom",
    Password: "tomtom",
    Email: "tomtom@gmail.com",
    Birthday: "1980-01-20",
    FavoriteBooks: ["My Footprints"],
  },
  {
    Username: "Luk",
    Password: "lukluk",
    Email: "lukluk@gmail.com",
    Birthday: "1981-02-21",
    FavoriteBooks: ["Prince & Knight"],
  },
  {
    Username: "Mia",
    Password: "miamia",
    Email: "miamia@gmail.com",
    Birthday: "1980-02-22",
    FavoriteBooks: ["And Tango Makes Three"],
  },
  {
    Username: "Pai",
    Password: "paipai",
    Email: "paipai@gmail.com",
    Birthday: "1980-03-23",
    FavoriteBooks: ["The Christmas Truck"],
  },
  {
    Username: "Roland",
    Password: "rolandroland",
    Email: "rolandroland@gmail.com",
    Birthday: "1980-04-24",
    FavoriteBooks: ["The extraordinary life of Alan Turing"]
  }
]


app.get('/', (req, res) => {
  res.send('Welcome to the first Queer Online Club for Children!');
});

// READ
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

app.get('/books/:title', (req, res) => {
  const { title } = req.params;
  const book = books.find(book => book.Title === title);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(400).send('No such book')
  }
});

/* app.get('/books/:publisher', (req, res) => {
  res.json(books.find((book) => { return book.Publisher === req.params.publisher }));
});
 */

/* app.get('/books/:ReadingAge', (req, res) => {
  const { ReadingAge } = req.params;
  const book = books.find(book => book.ReadingAge === ReadingAge);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(400).send('No such book')
  }
}); */


/* app.get('/books/genre/:name', (req, res) => {
  const { genreName } = req.params;
  const genre = books.find(book => book.Genre.Name === genreName);

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('No such genre')
  }
}); */

app.get('/books/authors/:authorName', (req, res) => {
  const { authorName } = req.params;
  const author = books.find(book => book.Author.Name === authorName).book;

  if (author) {
    res.status(200).json(author);
  } else {
    res.status(400).send('No such author')
  }
});


// CREATE (POST requests)
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }
})


// CREATE
app.post('/users/:id/:bookTitle', (req, res) => {
  const { id, bookTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteBooks.push(bookTitle);
    res.status(200).send(`${bookTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send('No such user')
  }
})

// DELETE
app.delete('/users/:id/:bookTitle', (req, res) => {
  const { id, bookTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteBooks = user.favoriteBooks.filter(title => title !== bookTitle);

    res.status(200).send(`${bookTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send('No such user')
  }
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);

    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('No such user')
  }
})

// UPDATE (PUT requests)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user)
  } else {
    res.status(400).send('No such user')
  }
})

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
})

