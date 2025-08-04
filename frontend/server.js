// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Custom validation middleware
server.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { name, number } = req.body

    if (!name || name.trim().length < 3) {
      return res.status(400).json({ error: 'Name must be at least 3 characters long' })
    }

    if (!number || number.trim().length < 5) {
      return res.status(400).json({ error: 'Number must be at least 5 characters long' })
    }
  }
  next()
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server running at http://localhost:3001')
})
