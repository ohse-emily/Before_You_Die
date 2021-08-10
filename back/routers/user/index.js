const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.post('/join', controller.join)
// router.get('/join_', controller.join_)
router.post('/login', controller.login)
router.get('/confirmEmail', controller.confirmEmail)
router.post('/userinfo', controller.getUserInfo)
router.post('/deletepost', controller.deletePost)


module.exports = router;