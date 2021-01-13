require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const fetch = require('node-fetch')
const Discord = require('discord.js')
const client = new Discord.Client()

let URLWH = `https://discord.com/api/v8/webhooks/${process.env.ID_WEBHOOK}/${process.env.TOKEN_WEBHOOK}`

io.on('connection', function (socket) {
  socket.on('send', function (data) {
    console.log(data);
    let username, content

    if(data.type == 'log') {
      username = 'System Discmd'
      content = `**__${data.message}__**`
    } else {
      username = data.nick
      content = data.message
    }

    const body = JSON.stringify({
      allowed_mentions: {
        parse: []
      },
      content: content,
      username: username,
      avatar_url: 'https://aux2.iconspalace.com/uploads/utilities-terminal-icon-256.png'
    })
  
    fetch(URLWH, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json'
        
      }
    })

    socket.broadcast.emit('message', data)

  })

})

client.on('ready', () => {
  console.log(`Ready bot`);
})

client.on('message', async message => {
  if (message.channel.id !== process.env.ID_CHANNEL) return
  if (message.author.bot) return
  
  io.emit('new message', {
    type: 'chat',
    message: message.cleanContent,
    nick: message.author.username
  })
})

const port = process.env.PORT || 8080

server.listen(port, function () {
  console.log(`Ready, port ${port}`)
  client.login()
  
})

process.on("unhandledRejection", (r) => {
  console.dir(r)
})