
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors')
app.use(cors())

const { swaggerUI, swaggerSpec } = require('./config/swagger')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// Updating routes created in src/routes
const bookingRoutes = require("./routes/booking");
app.use("/api/booking", bookingRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
    })
}

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;