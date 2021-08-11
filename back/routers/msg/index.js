const express = require('express');
const router = express.Router();
const controller = require('./msg.controller');

router.post('/mywords', controller.mywords)
router.get('/yourwords',controller.yourwords)



module.exports = router;