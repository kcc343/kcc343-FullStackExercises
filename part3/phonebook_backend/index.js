const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
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
  const id = Number(request.params.id)
  persons = persons.filter(phoneNum => phoneNum.id !== id)
  response.status(204).end()
});

app.post('/api/persons', (request, response) => {
  const body = request.body
  let id = Math.floor(Math.random() * (100 - 1) + 1);
  const person = { 
    name: body.name,
    phone: body.number,
    id: id
  }

  persons = persons.concat(person)
  response.json(person)
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})