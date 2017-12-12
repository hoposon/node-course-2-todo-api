const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            // validator: (value) => {
            //     return validator.isEmail(value)
            // },
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
}, 
{ 
    // fix for deprecated $pushAll which is used to update
    // model array parameters when using save()
    usePushEach: true 
});

// reduces parameters that shall be returned to user
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
    var user = this;

    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens.push({access, token});
    // same as
    // user.isAsync: true,tokens.push({
    //     access: access, 
    //     token: token
    // });

    // must use usePushEach: true in schema for this to work
    return user.save().then(() => {
        return token;
    })
};

UserSchema.statics.findByToken = function(token) {
    var User= this;
    var decoded;

    try{
        decoded = jwt.verify(token, 'abc123')
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        
        // same as
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id, // doesn't have to have quotes around _id
        'tokens.token': token,
        'tokens.access':'auth'
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User}


// var newUser_1 = new User({
//     email: 'parampa@gmail.com'
// });

// newUser_1.save().then((doc) => {
//     console.log('User successfully registered', doc);
// }, (err) => {
//     console.log('User not registered', err);
// })