import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (!message) return null
  return (
    <div style={{
      color: message.type === 'error' ? 'red' : 'green',
      background: '#f2f2f2',
      border: `2px solid ${message.type === 'error' ? 'red' : 'green'}`,
      padding: '10px',
      marginBottom: '10px'
    }}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(() => {
        showNotification('Failed to fetch persons', 'error')
      })
  }, [])

  const showNotification = (text, type = 'success') => {
    setNotification({ text, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleAddPerson = (e) => {
    e.preventDefault()
    const existing = persons.find(p => p.name === newName)

    if (existing) {
      if (
        window.confirm(`${newName} is already added. Replace the old number?`)
      ) {
        const updatedPerson = { ...existing, number: newNumber }
        personService
          .update(existing.id, updatedPerson)
          .then(returned => {
            setPersons(persons.map(p => p.id !== existing.id ? p : returned))
            showNotification(`Updated ${returned.name}`)
          })
          .catch(error => {
            showNotification(error.response?.data?.error || 'Update failed', 'error')
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returned => {
          setPersons(persons.concat(returned))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${returned.name}`)
        })
        .catch(error => {
          showNotification(error.response?.data?.error || 'Creation failed', 'error')
        })
    }
  }

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}`)
        })
        .catch(() => {
          showNotification(`Failed to delete ${person.name}`, 'error')
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <Filter value={filter} onChange={e => setFilter(e.target.value)} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleAddPerson}
        name={newName}
        number={newNumber}
        handleNameChange={e => setNewName(e.target.value)}
        handleNumberChange={e => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={handleDelete} />
    </div>
  )
}

export default App
