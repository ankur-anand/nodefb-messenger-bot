const keys = require('../../../keys/key');
const request = require('request');

module.exports = {
  getWebhook(req, res) {
    if (req.query['hub.verify_token'] === keys.VERIFY_TOKEN) {
      res.status(200).send(req.query['hub.challenge']);
    } else {
      res.status(403).send('Error, wrong validation token');
    }
  },

  postWebHook(req, res) {
    const data = req.body;
    // Making sure this is page subscription
    if (data.object === 'page') {
      // different object structures for messages recieved so make sure to
      // follow the structures properly otherwise it may led to infinite loop
      // as the callmay end up respoding to ACK messages as well
      // webhook structures
      // https://developers.facebook.com/docs/messenger-platform/webhook#setup
      let entryMessage = data.entry[0].messaging[0];
      let sender = entryMessage.sender.id;
      //is_echo becomes true when the message has been sent from the page itself
      // handling the case when user suscribe for such event for their app
      if (entryMessage.message && !entryMessage.message.is_echo) {
        let text = entryMessage.message.text;
        sendTextMessage(sender, `roger that ${text}`);
      }
    }
    res.sendStatus(200);
  }
};

function sendTextMessage(sender, text) {
  let messageData = { text: text };
  request(
    {
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: keys.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: {
        recipient: { id: sender },
        message: messageData
      }
    },
    function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    }
  );
}
