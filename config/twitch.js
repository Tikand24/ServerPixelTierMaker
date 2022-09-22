const tmi = require('tmi.js');
const http = require('http');
const express = require('express');
const app = express();
const { Server } = require('socket.io');

// Define configuration options
const opts = {
  identity: {
    username: process.env.USERNAME_TWITCH,
    password: process.env.PASSWORD_TWITCH,
  },
  channels: [],
};

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN_URL_SOCKET,
    methods: ['GET', 'POST'],
  },
});
io.listen(process.env.PORT_SOCKET);
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.join('votes');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
let client = new tmi.client(opts);
initializeSocket = (channels, connect = true) => {
  if (!connect) {
    client.disconnect().then(response=>console.log('responseOk',response)).catch(error=>console.log('errorDiscontect',error));
    return;
  }
  opts.channels = [channels];
  client = new tmi.client(opts);
  onMessageHandler = async (target, context, msg, self) => {
    if (self) {
      return;
    }

    const commandName = msg.trim();
    if (commandName === '!dice') {
      const num = rollDice();
      client.say(target, `You rolled a ${num}`);
      console.log(`* Executed ${commandName} command`);
    } else {
      if (io) {
        io.to('votes').emit('voteReceived', {
          message: commandName,
          username: context.username,
        });
        console.log(
          `* SocketId: Emit: ${context.username} - command: ${commandName}`
        );
      }
    }
  };
  rollDice = () => {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
  };

  // Called every time the bot connects to Twitch chat
  onConnectedHandler = (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
  };
  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);

  // Connect to Twitch:
  client.connect();
};
module.exports = { initializeSocket };
