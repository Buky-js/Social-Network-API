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
createThought(req, res){
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
           {_id: req.body.userId},
           { $addToSet: {thoughts: thought._id}},
           {new: true} 
        );
    })
    .then((user) => {
        !user
        ? res.status(404).json({
            message: 'Thought created, but found no user with that ID',
          })
        : res.json('Created the thought 🎉')
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
}



};