require('dotenv').config
let URL_WEBHOOK = `https://discord.com/api/v8/webhooks/${process.env.ID_WEBHOOK}/${process.env.TOKEN_WEBHOOK}`

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const fetch = require('node-fetch')

io.on('connection', function (socket) {
  socket.on('send', function (data) {
    const body = JSON.stringify({
      allowed_mentions: {
        parse: []
      },
      content: data.message,
      username: data.nick,
      avatar_url: 'https://aux2.iconspalace.com/uploads/utilities-terminal-icon-256.png'
    })

    fetch(URL_WEBHOOK, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    socket.broadcast.emit('message', data)

  })

})


const port = process.env.PORT || 8080

server.listen(port, function () {
  console.log(`Ready, port ${port}`)
})

process.on("unhandledRejection", (r) => {
  console.dir(r)
})