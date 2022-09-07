const tmi = require('tmi.js');
const http = require('http');
const { Server } = require('socket.io');

// Define configuration options
const opts = {
  identity: {
    username: process.env.USERNAME_TWITCH,
    password: process.env.PASSWORD_TWITCH,
  },
  channels: [process.env.CHANNELS],
};
initializeSocket = (app) => {
  const client = new tmi.client(opts);

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
  // Create a client with our options

  // Called every time a message comes in
  onMessageHandler = async (target, context, msg, self) => {
    if (self) {
      return;
    } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
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

  // Function called when the "dice" command is issued
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
