// var env = process.env.NODE_ENV || 'development';
// console.log('env *****', env);
// if (env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
// else MONGODB_URI from heroku is provided

// configuration is moved into config.json file
// config.json is never loaded to the repository
// it is added in .gitignore
var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    var config = require('./config.json'); // parses json to object automatically
    var envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    })
}