const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');
// Schema to create Thought model
const thoughtSchema = new Schema({
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a') 
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
        
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

thoughtSchema.virtual('reactionCount')
.get(function(){
    return this.reactions.length;
})
const Thought = model('thought', thoughtSchema);

module.exports = Thought;