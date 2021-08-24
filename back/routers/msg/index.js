const express = require('express');
const router = express.Router();
const controller = require('./msg.controller');

router.post('/mywords', controller.mywords)
router.post('/mymessages', controller.mymessages)
router.get('/yourwords',controller.yourwords)
router.get('/lastwordlikes',controller.lastwordLikes)
router.get('/loadfeed',controller.loadFeed)

module.exports = router;