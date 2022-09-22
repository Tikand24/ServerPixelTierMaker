const express = require('express');
const router = express.Router();
const { trackChat,disconnectChat } = require('../controllers/config');
const { validatorGetItem } = require('../validators/config');

router.get('/track-chat/:chat', validatorGetItem, trackChat);
router.get('/disconnect-chat', disconnectChat);

module.exports = router;
