const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id: ''}).then((todo) => {

});

Todo.findByIdAndRemove('5a270300eb1b6baa597f951f').then((todo) => {
    return console.log(todo);
});