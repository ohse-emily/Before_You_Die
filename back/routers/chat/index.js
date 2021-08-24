const express = require('express');
const router = express.Router();
const controller = require('./chat.controller');

router.post('/addchat', controller.addchat)
router.get('/getchat', controller.getchat)
router.post('/sendmsg', controller.sendmsg)

module.exports = router;