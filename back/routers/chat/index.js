const express = require('express');
const router = express.Router();
const controller = require('./chat.controller');

router.post('/addchat', controller.addchat)
router.get('/getchat', controller.getchat)
router.post('/sendmsg', controller.sendmsg)
router.post('/chat_history', controller.chat_history)

module.exports = router;