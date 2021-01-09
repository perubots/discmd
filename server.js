const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.sockets.on('connection', function (socket) {
  socket.on('send', function (data) {
    io.sockets.emit('message', data)

  })

})

const port = process.env.PORT || 8080

server.listen(port, function () {
  console.log(`Ready, port ${port}`)
})

process.on("unhandledRejection", (r) => {
  console.dir(r)
})