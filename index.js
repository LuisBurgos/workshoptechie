'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//Local Libs
const Messenger = require('./messenger.js')
const GreetingValidator = require('./greeting-validator.js')

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function(req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function(req, res) {
    if (req.query['hub.verify_token'] === 'NUESTRO_TOKEN_DE_VERIFICACION') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

app.post('/webhook/', function(req, res) {
    let messaging_events = req.body.entry[0].messaging
    console.log(messaging_events);
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        console.log("Messaging event");
        console.log(event);
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text

            if (GreetingValidator.textContainsGreeting(text)) {
                Messenger.sendTextMessage(sender, "Hola, mucho gusto, soy Workshop Techie")
                continue
            } else {
              Messenger.sendTextMessage(sender, "Para comenzar escribre 'Hola'")
              continue
            }

            if (text.toUpperCase().indexOf("Gracias".toUpperCase()) !== -1) {
                Messenger.sendTextMessage(sender, "De nada, estoy para servirte!")
                continue
            }
        }

    }
    res.sendStatus(200)
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
