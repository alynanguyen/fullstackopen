const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Import the Person model
const Person = require('./models/person');

// Set up the app
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

morgan.token('body', (req, res) => JSON.stringify(req.body));

// Custom logger for POST requests
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req) => req.method !== 'POST',
  })
);

// MongoDB URI from environment variable
const mongoUri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Routes

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// Get all persons
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons);
    })
    .catch(error => next(error)); // Pass errors to the error handler
});

// Get a single person by ID
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error)); // Pass errors to the error handler
});

// Delete a person by ID
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error)); // Pass errors to the error handler
});

// Add a new person
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  // Create a new person object
  const newPerson = new Person({
    name,
    number
  });

  // Save the person to the database
  newPerson
    .save()
    .then(savedPerson => {
      res.json(savedPerson);
    })
    .catch(error => next(error)); // Pass errors to the error handler
});

// Update an existing person's phone number
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  const id = req.params.id;

  // Ensure the name and number are provided
  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  // Update the person's number
  Person.findByIdAndUpdate(id, { name, number }, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    })
    .catch(error => next(error)); // Pass errors to the error handler
});

// Info endpoint
app.get('/info', (req, res, next) => {
  const date = new Date();
  Person.countDocuments({})
    .then(count => {
      res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
    })
    .catch(error => next(error)); // Pass errors to the error handler
});

// Centralized error handler middleware
app.use((error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  return res.status(500).json({ error: 'internal server error' });
});

// Set up the server to listen on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

