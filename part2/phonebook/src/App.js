import React, {useState} from 'react'

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
    let namePos = persons.indexOf(newName)
    if (namePos === -1) {
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
  let filterPersons = persons.filter(person => person.name.toLowerCase().startsWith(show))

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <div>
        <input onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addData}>
        <div>
          name: <input 
            onChange={handlePersonChange}
          />
        </div>
        <div>number: <input 
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterPersons.map(person => 
          <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App
