const {
    User,
    Thought
} = require('../models');

module.exports = {
        // get all users
        getUsers(req, res) {
            User.find()
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                // .select('-__v')

                .then((users) => res.json(users))
                .catch((err) => {
                    console.error({
                        message: err
                    });
                    res.status(500).json(err)
                });
        },
        // Get a single user
        getSingleUser(req, res) {
            User.findOne({
                    _id: req.params.userId
                })
                .select('-__v')
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .then((user) => {
                    !user
                        ?
                        res.status(404).json({
                            message: 'No user with that ID!'
                        }) : res.json(user)
                })
                .catch((err) => res.status(500).json(err));
        },
        // create a new user
        createUser(req, res) {
            User.create(req.body)
                .then((user) => res.json(user))
                .catch((err) => res.status(500).json(err));
        },
        // update a user
        updateUser(req, res) {
            User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            }).then((user) => {
                !user ? res.status(404).json({
                    message: "User with this ID cannot be found"
                }) : res.json(user)
            }).catch((err) => res.json(err));
        },
        // add new friend
        createFriend(req, res) {
            User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $addToSet: {
                    friends: req.params.friendId
                }
            }, {
                runValidators: true,
                new: true
            }).then((user) => {
                !user ? res.status(404).json({
                    message: 'Found no userwith that ID'
                }) : res.json(user)
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
        },
        // delete user 
        deleteUser(req, res) {
            User.findOneAndDelete({
                    _id: req.params.userId
                })
                .then((user) => {
                        !user
                            ?
                            res.status(404).json({
                                message: 'No user with that ID'
                            }) :
                            res.json('User deleted!')
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json(err);
                    })
                },
                // delete a friend
                deleteFriend(req, res) {
                    User.findOneAndUpdate({
                            _id: req.params.userId
                        }, {
                            $pull: {
                                friends: req.params.friendId
                            }
                        }, {
                            new: true
                        })
                        .then((user) =>
                            !user ?
                            res.status(404).json({
                                message: "No user with this ID was found"
                            }) :
                            res.json('friend deleted and removed from user'))
                        .catch((err) => res.json(err));
                }
        }