const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,  // Ensure the name is at least 3 characters long
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{5,15}/.test(v);  // Validate phone number format
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
}, { collection: 'persons' });

module.exports = mongoose.model('Person', personSchema);
