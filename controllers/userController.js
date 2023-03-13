const {User}  = require('../models');

module.exports = {
    // get all users
    getUsers(req, res){
        User.find()
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        // .select('-__v')
        
        .then((users) => res.json(users))
        .catch((err) => {
            console.error({ message: err });
            res.status(500).json(err)
        });
    },
// Get a single user
getSingleUser(req, res){
    User.findOne({_id: req.params.userId})
    .select('-__v')
    .then((user) => {
        !user 
        ? res.status(404).json({message: 'No user with that ID!'}) : res.json(user)
})
.catch((err) => res.status(500).json(err));
},

}