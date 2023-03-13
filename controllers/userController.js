const User = require('../models/User');

module.exports = {
    // get all users
    getUsers(req, res){
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    }
}