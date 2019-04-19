const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('public'))

const server = app.listen(5000, () => {
  console.log('Listening on 5000')
})

app.get('/', (req, res) => {
  res.send({ hello: 'there!' })
})

io.listen(server)

io.on('connection', socket => {
  console.log('A user is connected')
})

io.on('connection', socket => {
  // socket.on('chat message', function(msg) {
  //   console.log(`message: ` + msg)
  // })

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg)
  })
})
