const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
}, {collection: 'persons'});

// Create and export the model
module.exports = mongoose.model('Person', personSchema);
