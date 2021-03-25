require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

morgan.token('data', function(req, res) {
  return JSON.stringify(req.body);
});

const Person = require('./models/person')

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
});

app.get('/info', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  let date = new Date()
  response.end(`Phonebook has info for ${persons.length} people \n${date}`)
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const phone = persons.find(phoneNum => phoneNum.id === id)
  if (phone) {
    response.json(phone)
  } else {
    response.status(404).end()
  }
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => console.log(error))
});

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const person = new Person({ 
    name: body.name,
    phone: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})