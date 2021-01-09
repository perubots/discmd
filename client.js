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

rl.on('line', function (line) {
  if(line[0] == "/" && line.length > 1) {
    let cmd = line.match(/[a-z]+\b/)[0]
    let arg = line.substr(cmd.length+2, line.length)
    command(cmd, arg)

  } else {
    socket.emit('send', {
      type: 'chat', message: line, nick: nick
    })
    rl.prompt(true)
  }
})

function command(cmd, arg) {
  switch (cmd) {
    case 'nick':
      let log = nick + " changed name to "+ arg
      nick = arg
      socket.emit('send', {
        type: 'log', message: log
      })
      break;
    default:
      console_out('invalid command.')
      break;
  }
}

socket.on('message', function (data) {
  let leader
  if(data.type == 'chat' && data.nick != nick) {
    leader = color(`[${data.nick}] `, "green")
    console_out(leader + data.message)
  } else if(data.type == 'log') {
    console_out(color(data.message, 'cyan'))
  }
})