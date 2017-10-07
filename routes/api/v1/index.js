const router = require('express').Router();
const messengerWebHook = require('./messengerWebhook');

router.use('/messenger/webhook', messengerWebHook);

module.exports = router;
