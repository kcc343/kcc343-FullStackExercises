import React, {useState, useEffect} from 'react'
import Filter from './components/filter'
import PersonForm from './components/form'
import Person from './components/person'
import numberService from './services/number'
import Notification from './components/message'

const App = (data) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [show, setShow] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')
  let filterPersons = persons.filter(person => person.name.toLowerCase().startsWith(show.toLowerCase()))

  useEffect(() => {
      numberService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addData = (event) => {
    event.preventDefault()
    console.log(persons)
    let filterFind = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    if (filterFind.length === 0) {
      const nameObject = {
        name: newName,
        phone: newNum,
      }

      numberService
      .create(nameObject)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setMessage(`Added ${newName}`)
        setType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setType('error')
        setMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    } else if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
      const name = newName;
      const phone = newNum;
      const id = filterFind[0].id;
      const nameObject = { name, phone, id }
      numberService
      .update(id, nameObject)
      .then(updatePerson => {
        setPersons(persons.map(person => person.id !== nameObject.id ? person : updatePerson))
        setMessage(`Updated ${nameObject.name} phone`)
        setType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setType('error')
        console.log(error.response)
        setMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const deleteData = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      numberService
      .deleteNumber(id)
      .then(deletePerson => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setType('error')
        setMessage(`Information of ${name} has already been removed from server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
  
  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification message={message} type={type}/>
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
