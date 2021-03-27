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

const Person = require('./models/person');

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  })
});

app.get('/info', (request, response) => {
  let date = new Date()
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  Person.find({}).then(persons => {
    response.end(`Phonebook has info for ${persons.length} people \n${date}`)
  })
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
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
    phone: body.phone,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = { 
    name: body.name,
    phone: body.phone,
  }

  Person.findByIdAndUpdate(request.params.id, person, { returnOriginal: false } )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
