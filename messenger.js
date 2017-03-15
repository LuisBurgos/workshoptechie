'use strict'

const request = require('request')
const token = process.env.FB_PAGE_ACCESS_TOKEN

var data = require('./data.json');

module.exports = {

    sendTextMessage: function(sender, textToSend) {

        let messageData = {
            recipient: {
                id: sender
            },
            message: {
                text: textToSend
            }
        }

        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: token
            },
            method: 'POST',
            json: messageData

        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;

                console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
            } else {
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
            }
        });
    },

    sendCalendarMessage: function(sender) {
        const firstOption = {
          "title": data[0].name,
          "subtitle": data[0].responsable,
        }
        const secondOption = {
            "title": data[1].name,
            "subtitle": data[1].responsable,
        }

        let messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": firstOption.title,
                            "subtitle": firstOption.subtitle,
                            "image_url": "https://github.com/AdrianLeyva/workshop-technology/blob/master/Imagenes/logo.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Gracias",
                                    "payload": "Gracias"
                                }
                            ]
                        },
                        {
                          "title": secondOption.title,
                          "subtitle": secondOption.subtitle,
                            "image_url": "https://github.com/AdrianLeyva/workshop-technology/blob/master/Imagenes/logo.png",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Gracias",
                                    "payload": "Gracias"
                                }
                            ]
                        }
                    ]
                }
            }
        }

        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: sender
                },
                message: messageData
            }
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;

                console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
            } else {
                console.error("Unable to send message.");
                console.error(response);
                console.error(error);
            }
        });
    }

};
