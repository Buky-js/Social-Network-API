const {
    Schema,
    model
} = require('mongoose');

// Schema to create Usermodel
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

userSchema.virtual('friendCount')
// Create a virtual called `friendCount` that retrieves the length of the user's friends array
.get(function(){
    return this.friends.length;
});

// Initialize the User model
const User = model('user', userSchema);

module.exports = User;