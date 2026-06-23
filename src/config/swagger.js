const swaggerDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Book That Show.",
            version: "1.0.0"
        },
        tags: [
            {
                name: "Booking",
                description: "Movie booking endpoints"
            }
        ]
    },
    apis: ['./index.js']
}

const swaggerSpec = swaggerDoc(options)

module.exports = { swaggerUI, swaggerSpec }
