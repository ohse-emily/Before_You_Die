const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.get('/join', controller.join)
router.get('/login', controller.login)


module.exports = router;