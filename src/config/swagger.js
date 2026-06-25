const swaggerDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const path = require('path')

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
    apis: [path.join(__dirname, '../index.js'), path.join(__dirname, '../routes/*.js')]
}

const swaggerSpec = swaggerDoc(options)

module.exports = { swaggerUI, swaggerSpec }
