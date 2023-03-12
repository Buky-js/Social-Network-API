const mongoose = require('mongoose');
const { Thought, User } = require('../models');
const { seedUsers, seedThoughts } = require('./data');

const connection = require('../config/connection');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
// Drop existing thoughts
await Thought.deleteMany({});

// Drop existing users
await User.deleteMany({});

 // Add users to the collection and await the results
 await User.collection.insertMany(seedUsers);

 // Add thoughts to the collection and await the results
 await Thought.collection.insertMany(seedThoughts);
});

  // Log out the seed data to indicate what should appear in the database
  
  console.info('Seeding complete! 🌱');
  process.exit(0);