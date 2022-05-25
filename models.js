const { default: mongoose } = require("mongoose");

let bookSchema = mongoose.Schema({
  Title: { type: String, required: true },
  ReadingAge: String,
  Publisher: {
    Name: String,
    OLanguage: String,
    ReleaseYear: Number
  },
  Description: { type: String, required: true },
  Genre: String,
  Author: {
    Name: String,
    Origin: String
  },
  Illustrator: String,
  CoverURL: String,
  DigitalVersion: Boolean
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

let Book = mongoose.model('Book', bookSchema);
let User = mongoose.model('User', userSchema);

module.exports.Book = Book;
module.exports.User = User;