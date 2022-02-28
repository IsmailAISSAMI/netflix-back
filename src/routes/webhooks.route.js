const express = require('express');
const bodyParser = require('body-parser');
const webhookController = require('../controllers/webhooks.controller');

const router = express.Router();
router.post('/stripe', bodyParser.raw({ type: 'application/json' }),webhookController.stripewebhook);

module.exports = router;