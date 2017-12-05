const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id = '5a1f4478907eb11e1e579bb3';
// var id = '5a1f4478907eb11e1e579bb311';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo)
// });

// Todo.findById(id)
//     .then((todo) => {
//         if(!todo) {
//             return console.log('Id not found');
//         }
//         console.log('Todobyid', todo);
//     }).catch((e) => console.log(e));

User.findById('5a25c60d4176c7093b4996c6').then((user) => {
    if(!user) {
        return console.log('User does not exist');
    }

    console.log('User', user);
}, (e) => {
    console.log(e);
});

