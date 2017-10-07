const keys = require('../../../keys/key');
module.exports = {
  getWebhook(req, res) {
    if (req.query['hub.verify_token'] === keys.VERIFY_TOKEN) {
      res.status(200).send(req.query['hub.challenge']);
    } else {
      res.status(403).send('Error, wrong validation token');
    }
  },

  postWebHook(req, res) {
    console.log(req.body);
  }
};
