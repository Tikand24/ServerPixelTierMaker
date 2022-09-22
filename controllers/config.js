
const { matchedData } = require('express-validator');
const { initializeSocket } = require('../config/twitch');
const { handleHttpError } = require('../utils/handleError');
const trackChat = async (req, res) => {
  try {
    req = matchedData(req);
    const { chat } = req;
    initializeSocket(chat);
    res.send({ status: `CONNECTED TO ${chat}` });
  } catch (error) {
    handleHttpError(res, 'ERROR_CONNECT_CHAT');
  }
};
const disconnectChat = async (req, res) => {
  try {
    initializeSocket('',false);
    res.send({ status: `DISCONNECTED TO ALL CHANNELS` });
  } catch (error) {
    handleHttpError(res, 'ERROR_DISCONNECT_CHAT');
  }
};
module.exports = { trackChat,disconnectChat };
