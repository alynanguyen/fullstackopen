import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import personService from './services/persons'
import '../index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber
    };

    const existingPerson = persons.find(person => person.name === newName);

    if(newName.trim() === '' || newNumber.trim() === '') {
      alert('Name or number is missing');
      return;
    }

    if(existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`))
      {
        const changedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data));
            setNewName('');
            setNewNumber('');
          });
      }
    }
    else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons([...persons, response.data]);
          setNewName('');
          setNewNumber('');
        });

      setNotification(`${newName} is added successfully`);
      setNotificationType('success');

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);

    if(!person) return;

    if(window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then( response => {
          console.log('response', response);
          setPersons(persons.filter(person => person.id !== id))
        }
        )
        .catch(error => {
          setNotification(`Information of ${person.name} has already been removed from server`);
          setNotificationType('error');

          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={ (e) => setFilter(e.target.value)} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App