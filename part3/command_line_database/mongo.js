const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.jyv7t.mongodb.net/person-app?retryWrites=true&w=majority
  `

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    phone: process.argv[4]
  })
  
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.phone} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(personNum => {
      console.log(`${personNum.name} ${personNum.phone}`)
    })
    mongoose.connection.close()
  })
}

