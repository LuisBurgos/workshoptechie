'use strict'

module.exports = {
    textContainsGreeting: function(text) {
        const commonGreetings = [
            "hola",
            "hello",
            "hi",
            "alló",
            "que tal",
            "como estas",
            "buen día",
            "buenas tardes",
            "buen dia",
            "buenas noches"
        ]

        var hasGreeting = false
        for (let greeting of commonGreetings) {
            if (text.toUpperCase().indexOf(greeting.toUpperCase()) !== -1) {
                hasGreeting = true
            }

            var complexGreeting = greeting + " workshoptechie"
            if (text.toUpperCase().indexOf(complexGreeting.toUpperCase()) !== -1) {
                hasGreeting = true
            }
        }
        return hasGreeting
    }

}
