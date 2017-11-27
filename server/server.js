var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// todo
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var otherTodo = new Todo({
    text: ' Edit this video  '
});

// otherTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo', e);
// });

// user
// email - required, trimmed, type checked, min length 1
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var newUser_1 = new User({
    email: 'parampa@gmail.com'
});

newUser_1.save().then((doc) => {
    console.log('User successfully registered', doc);
}, (err) => {
    console.log('User not registered', err);
})






// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo')
// });

// var otherTodo = new Todo({
//     text: 'Cook dinner',
//     completed: false,
//     completedAt: 1245
// });

// otherTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo')
// });

