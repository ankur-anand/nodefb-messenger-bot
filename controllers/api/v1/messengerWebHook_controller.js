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
    // if (data.object === 'page') {
    //   data.entry.forEach(entry => {
    //     // iterate over each messaging event
    //     entry.messaging.forEach(messEvent => {
    //       const sender = messEvent.sender.id;
    //       if (messEvent.message && messEvent.message.text) {
    //         const text = messEvent.message.text;
    //         sendTextMessage(sender, `roger that! ${text} from messenger bot`);
    //       }
    //     });
    //   });
    // }
    res.status(200);
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
