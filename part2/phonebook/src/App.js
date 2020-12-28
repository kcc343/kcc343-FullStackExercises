import React, {useState, useEffect} from 'react'
import Filter from './components/filter'
import PersonForm from './components/form'
import Person from './components/person'
import numberService from './services/number'

const App = (data) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [show, setShow] = useState('')

  useEffect(() => {
      numberService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addData = (event) => {
    event.preventDefault()
    let filterFind = persons.filter(person => person.name.toLowerCase().startsWith(newName))
    if (filterFind.length === 0) {
      const nameObject = {
        name: newName,
        number: newNum,
        id: persons.length + 1
      }

      numberService
      .create(nameObject)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNum('')
      })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const deleteData = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      numberService
      .deleteNumber(id)
      .then(deletePerson => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShow(event.target.value)
  }
  
  let filterPersons = persons.filter(person => person.name.toLowerCase().startsWith(show.toLowerCase()))

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Filter handle={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm 
        handleAdd={addData} 
        handlePerson={handlePersonChange} 
        handleNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person 
        list={filterPersons}
        handleDeletion={deleteData} 
      />
    </div>
  )
}

export default App
