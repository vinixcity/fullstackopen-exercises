import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error.message))

// Mongoose schema and model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long']
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    minlength: [8, 'Number must be at least 8 characters long'],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

const Person = mongoose.model('Person', personSchema)

// Routes
app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({})
  res.json(persons)
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    if (person) res.json(person)
    else res.status(404).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body

  const person = new Person({ name, number })

  try {
    const saved = await person.save()
    res.json(saved)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  const { name, number } = req.body

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
    res.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

app.get('/info', async (req, res) => {
  const count = await Person.countDocuments({})
  res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
})

// Error handler middleware
app.use((error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
})

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
