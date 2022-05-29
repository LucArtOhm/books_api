const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

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

userSchema.statistics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Book = mongoose.model('Book', bookSchema);
let User = mongoose.model('User', userSchema);

module.exports.Book = Book;
module.exports.User = User;