const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetwork';
connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

module.exports = connection;