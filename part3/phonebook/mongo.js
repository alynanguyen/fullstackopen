const mongoose = require('mongoose');

// Get the password and name/number from command-line arguments
const password = process.argv[2];

// If password is not provided, show all phonebook entries
if (!password) {
  console.log('Password is required');
  process.exit(1);
}

// MongoDB connection string (use your own username and password)
const url = `mongodb+srv://anhnguyen:anhnguyen123@cluster0.u7fcp.mongodb.net/phonebook?retryWrites=true&w=majority`;

// Define the phonebook schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Create the model
const Person = mongoose.model('Person', personSchema, 'persons');

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => {
    // If no additional command-line args (name & number), list all phonebook entries
    if (process.argv.length === 3) {
      console.log('phonebook:');
      Person.find({}).then((persons) => {
        persons.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    }
    // If name and number are provided, add a new entry
    else if (process.argv.length === 5) {
      const name = process.argv[3];
      const number = process.argv[4];

      const person = new Person({
        name,
        number,
      });

      person
        .save()
        .then(() => {
          console.log(`added ${name} number ${number} to phonebook`);
          mongoose.connection.close();
        })
        .catch((error) => {
          console.error('Error adding person to phonebook:', error);
          mongoose.connection.close();
        });
    } else {
      console.log('Invalid number of arguments');
      mongoose.connection.close();
    }
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
  });
