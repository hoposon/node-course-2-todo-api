var mongoose = require('mongoose');
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

module.exports = {User}


// var newUser_1 = new User({
//     email: 'parampa@gmail.com'
// });

// newUser_1.save().then((doc) => {
//     console.log('User successfully registered', doc);
// }, (err) => {
//     console.log('User not registered', err);
// })
