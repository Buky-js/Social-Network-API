const mongoose = require('mongoose');
const { Thought, User } = require('../models');
// const { seedUsers, seedThoughts } = require('./data');

const connection = require('../config/connection');

const seedUsers = [{
    username: 'adeorits45',
    email: 'adeorits45@gmail.com',
},
{
    username: 'Buky434',
    email: 'buky432@gmail.com',
},
{
    username: 'ayowole',
    email: 'ayowole@hotmail.com',
}
]


const seedThoughts = [{
    thoughtText: 'Today is a good day',
    createdAt: new Date(),
    username: 'adeorits45'
},
{
    thoughtText: 'I love a gucci bag',
    createdAt: new Date(),
    username: 'Buky434'
},
{
    thoughtText: 'There is joy in helping others',
    createdAt: new Date(),
    username: 'ayowole'
},
]

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
// Drop existing thoughts
await Thought.deleteMany({});

// Drop existing users
await User.deleteMany({});

 // Add users to the collection and await the results
 await User.collection.insertMany(seedUsers);
 console.log(seedUsers);

 // Add thoughts to the collection and await the results
 await Thought.collection.insertMany(seedThoughts);
});

  // Log out the seed data to indicate what should appear in the database
  
  console.info('Seeding complete! 🌱');
//   process.exit(0);