const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://sppirtti:${password}@cluster0-pkxno.mongodb.net/phonebook-app?retryWrites=true&w=majority `
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)



const name = process.argv[3] || null
const number = process.argv[4]

if (name !== null) {
    const person = new Person({
        name: name,
        number: number,
        id: 100
    })

    person.save().then(response => {
        console.log(`Added ${name}, number: ${number} to Phonebook`)
        mongoose.connection.close()
    })

}

if(name === null) {
    Person.find({}).then(result => {
        console.log('PhoneBook: ')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
