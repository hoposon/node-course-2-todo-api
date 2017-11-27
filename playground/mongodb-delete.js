// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server')

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat my Lunch'}).then((result) => {
    //     console.log(result);
    // });
    // deleteOne
    // db.collection('Todos').deleteOne({text: "Eat the dog"}).then((result) => {
    //     console.log(result);
    // });
    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Lukas Houf'}).then((result) => {
    //     console.log(result);
    // });
    db.collection('Users').deleteOne({
        _id: new ObjectID('5a09ac0287e51f0b44ec9bc7')
    }).then((result) => {
        console.log(result)
    });

    //db.close();
});


