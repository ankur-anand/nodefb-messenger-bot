const router = require('express').Router();
const messengerWebHook_controller = require('../../../controllers/index');

router.get('/', messengerWebHook_controller.getWebhook);
router.post('/', messengerWebHook_controller.postWebHook);
module.exports = router;
