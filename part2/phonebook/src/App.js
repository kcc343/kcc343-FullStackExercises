import React, {useState} from 'react'
import Filter from './components/filter'
import PersonForm from './components/form'
import Person from './components/person'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [show, setShow] = useState('')

  const addData = (event) => {
    event.preventDefault()
    let filterFind = persons.filter(person => person.name.toLowerCase().startsWith(newName))
    if (filterFind.length === 0) {
      const nameObject = {
        name: newName,
        number: newNum
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNum('')
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
