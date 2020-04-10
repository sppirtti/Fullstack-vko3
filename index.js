const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))


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
var datetime = new Date()


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get(`/api/persons/:id`, (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => {
        return person.id === id
    })

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
      <p> ${datetime} </p>`)
})

const generateId = () => {
    return Math.floor(Math.random() * 10000) + 1
}

app.post('/api/persons', (req, res) => {

    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    const check = persons.find(person => {
        return person.name === body.name
    })

    if (check) {
        return res.status(400).json({
            error: 'Already person with this name'
        })
    }

    persons = persons.concat(person)

    res.json(person)
    console.log(req.body)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})