const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

// in methods, functions for User instance are defined
// -----------------
// reduces parameters that shall be returned to user
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

// generates token and stores it to DB
UserSchema.methods.generateAuthToken = function() {
    var user = this;

    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
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

// deletes user's token
UserSchema.methods.removeToken = function(token) {
    var user = this;

    return user.update({
        // pulls an object that matches the condition out of the array (deletes id)
        $pull: {
            tokens: {
                token: token
            }
        }
    });
};

// in statics, functions for User definition are defined
// --------------------
// finds user by token
UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
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

// finds user by email and password
UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(err) {
                    reject();
                } else if (res) {
                    resolve(user);
                } else {
                    reject();
                }
                
            })
        })
    });
};

// mongoose middleware
// this is called before action specified in first argument (save)
// before user is saved
UserSchema.pre('save', function(next) {
    var user = this;

    // this checks if password parameter is going to be modified during the save
    // otherwise hashing funcion inside this block would hash hashed value
    // over and over again
    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

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