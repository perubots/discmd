let socket = require('socket.io')
let io = socket.listen(8080)

io.sockets.on('connection', function (socket) {
  socket.on('send', function (data) {
    io.sockets.emit('message', data)

  })

})