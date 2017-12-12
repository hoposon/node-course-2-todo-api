const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'lukas.houf@gmail.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'test1@test.com',
    password: 'userTwoPass'
}];

const todos =[{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 3
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save(); // returns promise
        var userTwo = new User(users[1]).save(); // returns promise

        return Promise.all([userOne, userTwo]) // .then is not executed until all promises are resolved
    }).then(() => done())
};

module.exports = {todos, populateTodos, users, populateUsers};