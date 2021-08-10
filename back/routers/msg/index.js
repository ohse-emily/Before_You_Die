const express = require('express');
const router = express.Router();
const controller = require('./msg.controller');

router.post('/mywords', controller.mywords)




module.exports = router;