const Mongoose = require('mongoose');
const validator = require('validator');

Mongoose.connect(`mongodb://localhost:27017/testdb`).then(() => {
  console.log('connected ...');
}).catch((err) => {
  console.log(err);
})
// User Model // ORM 
const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  },
  firstName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
userSchema.methods.findSimilarUser = function(cb) {
  return User.find({ email: 'test@gmail.com' }, cb);
}
// creating a model 
const User = Mongoose.model('Email', userSchema)

const user = new User({
  email: 'test@gmail.com',
  firstName: 'hello'
})

user.save().then((doc) => {
  console.log(doc)
}).catch((err) => {
  console.log(err);
})

User.find({
  email: 'test@gmail.com'
}).then(doc => {
  console.log(doc);
})

User.find({
  email: 'test@gmail.com'
}, {
  email: 'test2@gmail.com'
}, {
  new: true
}).then((doc) => {
  console.log(doc);
})

User.

// 
Mongoose 
Query Builder 
Middleware 
Instance Methods
Static Methods 