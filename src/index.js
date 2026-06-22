
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require('cors')
app.use(cors())

app.post("/api/booking", async (req, res) => {
    const { movie, slot, seats } = req.body;
    try {
        const newBooking = new connection({ movie, slot, seats });
        await newBooking.save();
        res.status(200).json({ message: "Booking successful", data: newBooking });
    } catch (err) {
        res.status(500).json({ message: "Booking failed", error: err.message });
    }
});

app.get("/api/booking", async (req, res) => {
    try {
        const lastBooking = await connection.findOne().sort({ _id: -1 });
        if (!lastBooking) {
            return res.status(200).json({ message: "no previous booking found" });
        }
        res.status(200).json(lastBooking);
    } catch (err) {
        res.status(500).json({ message: "Error fetching booking", error: err.message });
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;