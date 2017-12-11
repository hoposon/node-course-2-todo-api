var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true // for newer versions of mongoose then used in tutorial
  });
// mongoose.set('debug', true);

module.exports = {
    mongoose // same as mongoose: mongoose
}