const {
    error
} = require('console');
const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({
                _id: req.params.thoughtId
            })
            .select('-__v')
            .then((thought) => {
                !thought
                    ?
                    res.status(404).json({
                        message: 'No thought with that ID!'
                    }) : res.json(thought)
            })
            .catch((err) => res.status(500).json(err));
    },
    // Creates a new thought. Accepts a request body with the entire Thought object.
    // Because thoughts are associated with Users, we then update the User who created the thought and add the ID of the thought to the thoughts array
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate({
                    _id: req.body.userId
                }, {
                    $addToSet: {
                        thoughts: thought._id
                    }
                }, {
                    new: true
                });
            })
            .then((user) => {
                !user
                    ?
                    res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    }) :
                    res.json('Created the thought 🎉')
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // create a reation
    createReaction(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        }, {
            $addToSet: {
                reactions: req.body
            }
        }, {
            runValidators: true,
            new: true
        }).then((thought) => {
            !thought
                ?
                res.status(404).json({
                    message: 'No thought found with this ID'
                }) :
                res.json('created the reaction')
        })
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({
                _id: req.params.thoughtId
            })
            .then((thought) => {
                // console.log(thought);
                !thought
                    ?
                    res.status(404).json({
                        message: 'No thought with that ID'
                    }) :
                    res.json('thought has been deleted and removed from user')

            }).catch((err) => res.json(err));


    },
    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.thoughtId
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        }).then((thought) => {
            !thought ? res.status(404).json({message: 'thought with this ID cannot be found'})
            : res.json(thought)
        }).catch((err)=> res.json(err))
    },
    // delete reaction
    deleteReaction(req, res) {
        // console.log(req.params.thoughtId, req.params.reactionId);
        Thought.findOneAndUpdate({
              _id: req.params.thoughtId
            }, {
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionId
                    }
                }
            }, {
                runValidators: true,
                new: true
            })
            .then((thought) => !thought ?
                res.status(404).json({
                    message: "No thought with this ID was found!"
                }) :
                res.json(thought))
            .catch((err) => res.json(err))
    }
}