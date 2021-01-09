const { Socket } = require('dgram')
let readline = require('readline')
let socketClient = require('socket.io-client')
let util = require('util')
let color = require('ansi-color').set

let nick
let socket = socketClient.connect('localhost', { port: 8080 })
let rl = readline.createInterface(process.stdin, process.stdout)

function console_out(msg){
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  console.log(msg)
  rl.prompt(true)
}
rl.question('Agrege un nickname: ', function(name) {
  nick = name
  let msg = nick + " join the chat"
  socket.emit('send', {
    type: 'log', message: msg
  })
  rl.prompt(true)
})
