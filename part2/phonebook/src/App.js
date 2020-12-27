import React, {useState, useEffect} from 'react'
import Filter from './components/filter'
import PersonForm from './components/form'
import Person from './components/person'
import axios from 'axios'

const App = (data) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [show, setShow] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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

      axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNum('')
      })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
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
      <Person list={filterPersons} />
    </div>
  )
}

export default App
